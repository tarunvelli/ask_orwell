class Api::V1::QuestionsController < ApplicationController
  before_action :set_question, only: %i[show destroy]

  def index
    question = Question.all.order(created_at: :desc)
    render json: question
  end

  def create
    question = Question.create!(question_params)
    if question
      render json: question
    else
      render json: question.errors
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
    params.permit(:prompt)
  end

  def set_question
    @question = Question.find(params[:id])
  end
end
