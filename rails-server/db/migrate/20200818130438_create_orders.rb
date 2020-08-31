class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :status
      t.string :email
      t.string :reference
      t.boolean :email_confirmed
      t.timestamps
    end
  end
end
