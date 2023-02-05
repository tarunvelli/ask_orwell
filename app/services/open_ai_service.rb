# frozen_string_literal: true

class OpenAiService
  attr_reader :client

  QUERY_EMBEDDINGS_MODEL = 'text-search-curie-query-001'
  COMPLETIONS_MODEL = 'text-davinci-003'

  def initialize
    @client = OpenAI::Client.new(access_token: ENV['OPENAI_API_KEY'])
  end

  def completions(prompt)
    result = client.completions(
      parameters: {
        prompt: prompt,
        temperature: 0.0,
        max_tokens: 150,
        model: COMPLETIONS_MODEL
      }
    )

    result.dig('choices', 0, 'text')&.strip
  end

  def embeddings(prompt)
    result = client.embeddings(
      parameters: {
        input: prompt,
        model: QUERY_EMBEDDINGS_MODEL
      }
    )

    result.dig('data', 0, 'embedding')
  end
end
