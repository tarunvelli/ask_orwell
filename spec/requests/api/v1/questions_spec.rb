require 'rails_helper'

RSpec.describe "Api::V1::Questions", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/questions/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/questions/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/questions/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/questions/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
