class Item < ApplicationRecord
  has_many :requests, dependent: :destroy
end
