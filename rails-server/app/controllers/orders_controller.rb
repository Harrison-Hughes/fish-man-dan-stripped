class OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def show
    order = Order.find_by(reference: params[:order_reference])
    if !order
      render json: {error: 'order not found'}
    else 
      render json: order
    end
  end

  def show_and_confirm
    order = Order.find_by(reference: params[:order_reference])
    if !order
      render json: {error: 'order not found'}
    else 
      if order.email_confirmed
        render json: {just_confirmed: false, order: {id: order.id, status: order.status, address: order.address, requests: order.requests, reference: order.reference, email: order.email, created_at: order.created_at, updated_at: order.updated_at}}
      else 
        if order.update({email_confirmed: true})
          render json: {just_confirmed: true, order: {id: order.id, status: order.status, address: order.address, requests: order.requests, reference: order.reference, email: order.email, created_at: order.created_at, updated_at: order.updated_at}}
        else 
          render json: {error: 'could not confirm order'}
        end
      end
    end
  end

  def update_order_status
    order = Order.find_by(reference: params[:order_reference])
    if order.update({status: order_params[:status]})
      render json: order
    else 
      render json: {error: 'could not cancel order'}
    end
  end

  # def email_confirm
  #   order = Order.find_by(reference: params[:order_reference])
  #   if order.update({email_confirmed: true})
  #     render json: order
  #   else 
  #     render json: {error: 'could not confirm order'}
  #   end
  # end

  def create
    if !is_email_valid(order_params[:email])
      render json: {error: 'invalid email field'}
    else
      request_objects = order_params[:request_objects] # request objects => [{item_id: ~, amount: ~}, ...]
      
      unique_reference = false
      while unique_reference == false
        reference = rand(36**8).to_s(36)
        if !Order.find_by(reference: reference) && reference.length == 8 && reference.count("0-9") > 0
          unique_reference = true
        end
      end
      
      address = Address.create(order_params[:address])
      order = Order.new(status: 'pending',  address: address, email: order_params[:email], reference: reference, email_confirmed: false)
      
      if order.save 
        if !Request.make_requests(order, request_objects).any? { |r| r.nil? }

          OrderMailer.with(email_address: order_params[:email], order_reference: reference).order_confirm_email.deliver_later

          render json: order
        else 
          order.destroy
          render json: { error: "could not make requests" }
        end
      else 
      end
    end
  end

  private

  def order_params
    params.require(:order).permit(:status, :email, address: {}, request_objects: [:item_id, :amount])
  end

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  def is_email_valid(email)
    email =~VALID_EMAIL_REGEX
  end

end
