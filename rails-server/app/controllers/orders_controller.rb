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
    while unique_reference = false
      reference = rand(12**length).to_s(12)
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
      render json: { error: "could not place order" }
    end
  end

  private

  def order_params
    params.require(:order).permit(:request_objects, :address, :status)
  end

  def invalid_fields
    address = JSON.parse(order_params[:address])
    
    invalid_fields = {}
    invalid_fields["recipient_name"]="Please enter the name of the recipient." if address["recipient_name"]==""
    invalid_fields["postcode"]="Please enter a valid postcode." if address["postcode"].length < 5 ||address["postcode"].length > 8
    invalid_fields["line_one"]="Please enter an address." if address["line_one"]==""
    invalid_fields["town_city"]="Please enter a town/city." if address["town_city"]==""
    invalid_fields["county"]="Please enter a county." if address["county"]==""
    invalid_fields["contact_number"]="Please enter a phone number so we can call if there are any issues with delivery." if address["contact_number"]==""
    return invalid_fields
  end
end