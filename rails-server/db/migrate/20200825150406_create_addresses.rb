class CreateAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :addresses do |t|
      t.string :recipient_name
      t.string :line_one
      t.string :line_two
      t.string :town_city
      t.string :county
      t.string :postcode
      t.string :contact_number

      t.references :order, null: false, foreign_key: true
      t.timestamps
    end
  end
end
