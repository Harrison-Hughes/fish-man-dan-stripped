Rails.application.routes.draw do
  resources :items, only: [:index, :create, :update, :destroy]
  resources :orders, only: [:index, :create, :update, :destroy]
  get "/validate_address", to: "orders#validate_address"
end
