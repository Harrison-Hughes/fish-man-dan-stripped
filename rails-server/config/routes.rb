Rails.application.routes.draw do
  resources :items, only: [:index, :create, :update, :destroy]
  resources :orders, only: [:index, :create, :update, :destroy]

  post "/validate_address", to: "addresses#validate_address"

  get "/order/:order_reference", to: "orders#show"
  patch "/order/update_order_status/:order_reference", to: "orders#update_order_status"
  patch "/order/email_confirm/:order_reference", to: "orders#email_confirm"
end
