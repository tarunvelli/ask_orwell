class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.text :prompt, limit: 1_000
      t.text :answer, limit: 1_000
      t.integer :ask_count, default: 0
      t.string :audio_src_url, null: true, limit: 255
      t.text :context, null: true

      t.timestamps
    end
  end
end
