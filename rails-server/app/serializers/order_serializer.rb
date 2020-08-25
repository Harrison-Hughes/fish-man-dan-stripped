class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :address, :requests, :reference

end
