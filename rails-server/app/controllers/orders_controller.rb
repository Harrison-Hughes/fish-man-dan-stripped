class OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  # def validate_address
  #   if invalid_address_fields.length > 0
  #     render json: { error: "invalid form fields", invalid_fields: invalid_address_fields }
  #   else 
  #     @valid_address = address_params
  #     render json: {message: "address valid"}
  #   end
  # end

  def create
    request_objects = JSON.parse(order_params[:request_objects]) # request objects => [{item_id: ~, amount: ~}, ...]
    
    unique_reference = false
    while unique_reference == false
      reference = rand(36**6).to_s(36)
      if !Order.find_by(reference: reference)
        unique_reference = true
      end
    end
    p("ORDER PARAMS ADDRESS", order_params[:address])
    address = Address.create(order_params[:address])
    order = Order.new(status: 'pending confirmation',  address: address, email: order_params[:email], reference: reference)

    if order.save 
      if !Request.make_requests(order, request_objects).any? { |r| r.nil? }
        render json: order
      else 
        order.destroy
        render json: { error: "could not make requests" }
      end
    else 
    end
  end

  private

  def order_params
    params.require(:order).permit(:request_objects, :status, :email, address: {})
  end

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  def is_email_valid(email)
    email =~VALID_EMAIL_REGEX
  end

end
