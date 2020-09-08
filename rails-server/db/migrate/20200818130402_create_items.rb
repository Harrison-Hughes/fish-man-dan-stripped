class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :valid_until
      t.string :size
      t.boolean :custom_amount
      t.string :fresh
      t.boolean :is_frozen
      t.boolean :price_by_each 
      t.string :price_per
      t.string :species
      t.string :min
      t.string :max
      t.string :grade
      t.timestamps
    end
  end
end
