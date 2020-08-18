class Order < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :status
      t.string :address
      t.timestamps
    end
  end
end
