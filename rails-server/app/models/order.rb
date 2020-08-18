class Order < ApplicationRecord
  has_many :requests, dependent: :destroy
end
