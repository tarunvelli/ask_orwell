# frozen_string_literal: true

class OpenAiService
  attr_reader :client

  MODEL_NAME = 'curie'
  QUERY_EMBEDDINGS_MODEL = "text-search-#{MODEL_NAME}-query-001".freeze
  DOC_EMBEDDINGS_MODEL = "text-search-#{MODEL_NAME}-doc-001".freeze
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

  def query_embeddings(prompt)
    result = client.embeddings(
      parameters: {
        input: prompt,
        model: QUERY_EMBEDDINGS_MODEL
      }
    )

    result.dig('data', 0, 'embedding')
  end

  def doc_embeddings(prompt)
    result = client.embeddings(
      parameters: {
        input: prompt,
        model: DOC_EMBEDDINGS_MODEL
      }
    )

    result.dig('data', 0, 'embedding')
  end
end
