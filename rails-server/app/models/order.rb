class Order < ApplicationRecord
  has_one :address
  has_many :requests, dependent: :destroy
end
