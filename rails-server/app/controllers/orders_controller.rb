class OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def validate_address
    if invalid_fields.length > 0
      render json: { error: "invalid form fields", invalid_fields: invalid_fields }
    else render json: {message: "address valid"}
    end
  end

  def create
    request_objects = JSON.parse(order_params[:request_objects]) # request objects => [{item_id: ~, amount: ~}, ...]
    
    unique_reference = false
    while unique_reference == false
      reference = rand(36**6).to_s(36)
      if !Order.find_by(reference: reference)
        unique_reference = true
      end
    end

    order = Order.new(status: 'pending confirmation',  address: order_params[:address], email: order_params[:email], reference: reference)

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
    params.require(:order).permit(:request_objects, :status, :address)
  end

  def address_params
    params.require(:address).permit(:id, :recipient_name, :postcode, :line_one, :line_two, :town_city, :county, :contact_number)
  end

  def invalid_fields
    invalid_fields = {}
    invalid_fields["recipient_name"]="Please enter the name of the recipient." if address_params[:recipient_name]==""
    invalid_fields["postcode"]="Please enter a valid postcode." if address_params[:postcode].length < 5 ||address_params[:postcode].length > 8
    invalid_fields["line_one"]="Please enter an address." if address_params[:line_one]==""
    invalid_fields["town_city"]="Please enter a town/city." if address_params[:town_city]==""
    invalid_fields["county"]="Please enter a county." if address_params[:county]==""
    invalid_fields["contact_number"]="Please enter a phone number so we can call if there are any issues with delivery." if address_params[:contact_number]==""
    return invalid_fields
  end
end
