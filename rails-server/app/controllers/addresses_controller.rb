class AddressesController < ApplicationController

  def validate_address
    if invalid_address_fields.length > 0
      render json: { error: "invalid form fields", invalid_fields: invalid_address_fields }
    else 
      render json: {message: "address valid"}
    end
  end

  private

  def address_params
    params.require(:address).permit(:recipient_name, :postcode, :line_one, :line_two, :town_city, :county, :contact_number)
  end

  def invalid_address_fields
    invalid_fields = {}

    invalid_fields["recipient_name"]="Please enter the name of the recipient." if address_params[:recipient_name]==""
    invalid_fields["recipient_name"]="Please enter the name of the recipient." if address_params[:recipient_name]==""
    invalid_fields["postcode"]="Please enter a valid postcode." if address_params[:postcode].length < 5 ||address_params[:postcode].length > 8
    invalid_fields["line_one"]="Please enter an address." if address_params[:line_one]==""
    invalid_fields["town_city"]="Please enter a town/city." if address_params[:town_city]==""
    invalid_fields["county"]="Please enter a county." if address_params[:county]==""
    invalid_fields["contact_number"]="Please enter a phone number so we can call if there are any issues with delivery." if address_params[:contact_number]==""
    return invalid_fields
  end
end
