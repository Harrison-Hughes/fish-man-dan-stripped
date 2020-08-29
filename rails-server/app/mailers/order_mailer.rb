class OrderMailer < ApplicationMailer
  default from: 'fishmandanorderportal@gmail.com'

  def order_confirm_email
    @email_address = params[:email_address]
    @order_reference = params[:order_reference]
    @url = "http://localhost:3001/receipt/#{params[:order_reference]}"
    mail(to: @email_address, subject: 'Fish-man-Dan order confirmation')
  end

  def order_cancel_email
    @email_address = params[:email_address]
    @order_reference = params[:order_reference]
    @url = "http://localhost:3001/receipt/#{params[:order_reference]}"
    mail(to: @email_address, subject: 'Fish-man-Dan order confirmation')
  end

end
