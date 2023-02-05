class Api::V1::QuestionsController < ApplicationController
  before_action :set_question_by_id, only: %i[show destroy]
  before_action :set_question_by_prompt, only: %i[create]

  def index
    question = Question.order(ask_count: :desc).limit(9)
    render json: question
  end

  def create
    if @question
      render json: @question
    else
      render json: @question.errors
    end
  end

  def show
    render json: @question
  end

  def destroy
    @question&.destroy
    render json: { message: 'Question deleted!' }
  end

  private

  def question_params
    params.require(:question).permit(:prompt)
  end

  def set_question_by_id
    @question = Question.find(params[:id])
  end

  def set_question_by_prompt
    @question = Question.find_or_create_by!(question_params)
    ask_count = @question.ask_count + 1
    @question.update(ask_count: ask_count)
  end
end
