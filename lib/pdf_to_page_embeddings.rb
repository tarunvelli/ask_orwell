# frozen_string_literal: true

class PdfToPageEmbeddings
  def initialize(book)
    @book = book
    @tokenizer = Tokenizers.from_pretrained('gpt2')
    @openai = OpenAiService.new
  end

  def execute
    rows = []
    pdf = PDF::Reader.new("lib/assets/#{book}")
    pdf.pages.each_with_index do |page, index|
      rows << extract_pages(page.text.strip.squeeze(' '), index + 1)
    end

    df = Rover::DataFrame.new(rows)
    @data = df[df[:tokens] < 2046]

    generate_pages_file
    generate_embeddings_file
  end

  private

  attr_reader :book, :tokenizer, :openai, :data

  def generate_pages_file
    File.write("lib/assets/#{book}.pages.csv", data.to_csv)
  end

  def generate_embeddings_file
    CSV.open("lib/assets/#{book}.embeddings.csv", 'w') do |csv|
      csv << ['title'] + (0..4095).to_a
      doc_embeddings.each do |i, embedding|
        csv << ["Page #{i + 1}"] + embedding
      end
    end
  end

  def count_tokens(text)
    tokenizer.encode(text).ids.length
  end

  def extract_pages(page_text, index)
    return [] if page_text.length.zero?

    content = page_text.split.join(' ')

    {
      title: "Page #{index}",
      content: content,
      tokens: count_tokens(content) + 4
    }
  end

  def doc_embeddings
    @doc_embeddings ||= {}.tap do |embeddings|
      index = 0
      data.each_row do |row|
        embeddings[index] = openai.doc_embeddings(row[:content])
        index += 1
      end
    end
  end
end
