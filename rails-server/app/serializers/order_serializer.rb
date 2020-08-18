class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :address, :requests

end
