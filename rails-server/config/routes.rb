Rails.application.routes.draw do
  resources :items, only: [:index, :create, :update, :destroy]
  resources :orders, only: [:index, :create, :update, :destroy]

  post "/validate_address", to: "addresses#validate_address"

  get "/order/:order_reference", to: "orders#show"
  post "/order/cancel_order/:order_reference", to: "orders#cancel_order"
end
