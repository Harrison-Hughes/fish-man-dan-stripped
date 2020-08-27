class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :address, :requests, :reference, :email, :created_at, :updated_at

end
