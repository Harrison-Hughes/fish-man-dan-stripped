# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

items = Item.create([
  {name: 'Shetland Cod portions', size: '140g - 170g', fresh: 'fresh', is_frozen: false, price_by_each: true, price_per: '3.50', min: "1", max: "100",  grade: 'Superior' },
  {name: 'Shetland Cod whole side', size: '1.2kg - 1.5kg', fresh: 'fresh', is_frozen: false, price_by_each: false, price_per: '15.95', min: "1", max: "100",  grade: 'Superior' },
  {name: 'Shetland Salmon', size: '140g - 170g', fresh: 'fresh', is_frozen: false, price_by_each: true, price_per: '3.00', min: "1", max: "100",  grade: 'Superior' },
  {name: 'Cod, bacon and brie fishcakes', size: '115g', fresh: '', is_frozen: true, price_by_each: true , price_per: '1.50', min: "1", max: "100",  grade: '' },
  {name: 'Farmed bass', size: '400g - 600g', fresh: 'fresh', is_frozen: false, price_by_each: true, price_per: '5.00', min: "1", max: "100",  grade: 'Farmed in greece' },
  {name: 'Brixham monkfish fillet skinless and boneless', size: 'Cut to any', fresh: 'fresh', is_frozen: false, price_by_each: false, custom_amount: true, price_per: '19.95', min: "1", max: "100",  grade: 'superior' },
  {name: 'Sashimi grade yellow fin tuna', size: 'Cut to any', fresh: 'fresh', is_frozen: false, price_by_each: false, custom_amount: true, price_per: '22.5', min: "", max: "",  grade: 'superior' }
])