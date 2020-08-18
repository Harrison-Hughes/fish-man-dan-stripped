class Request < ApplicationRecord
  belongs_to :item
  belongs_to :order
  
  def self.make_requests(order, request_objects) # request objects => [{item_id: ~, amount: ~}, ...]
    output = request_objects.map{ |r| Request.create(order: order, item: Item.find_by(id: r["item_id"].to_i), amount: r["amount"])}
    return output
  end

end
