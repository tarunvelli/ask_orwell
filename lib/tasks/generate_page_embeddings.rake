# frozen_string_literal: true

desc 'Generate page embeddings'
task :generate_page_embeddings, [:book] => :environment do |_t, args|
  puts 'Generate page embeddings...'
  PdfToPageEmbeddings.new(args[:book]).execute
  puts 'Generation complete!'
end
