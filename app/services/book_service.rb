# frozen_string_literal: true

class BookService
  attr_reader :name

  def initialize(name:)
    @name = name
  end

  def pages
    @pages ||= Rover.read_csv("storage/#{name}.pdf.pages.csv")
  end

  def context_embeddings
    @context_embeddings ||= {}.tap do |hash|
      df = Rover.read_csv("storage/#{name}.pdf.embeddings.csv")
      max_dim = df.keys.reduce(0) { |memo, val| val != 'title' && val.to_i > memo ? val.to_i : memo }
      df.each_row { |row| hash[row['title']] = (0..max_dim).map { |i| row[i.to_s] } }
    end
  end
end
