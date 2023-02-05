class Question < ApplicationRecord
  validates :prompt, presence: true
  before_create :set_answer

  private

  def set_answer
    answer_service = AnswerService.new(prompt)
    self.prompt = answer_service.prompt
    self.context = answer_service.context
    self.answer = answer_service.complete
  end
end
