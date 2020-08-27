Rails.application.routes.draw do
  resources :items, only: [:index, :create, :update, :destroy]
  resources :orders, only: [:index, :create, :update, :destroy]
  get "/order/:order_reference", to: "orders#show"
  post "/validate_address", to: "addresses#validate_address"
end
