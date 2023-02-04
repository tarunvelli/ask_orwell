Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :questions, only: %i[index show create destroy]
    end
  end

  root 'welcome#index'
  get '/*path' => 'welcome#index'
end
