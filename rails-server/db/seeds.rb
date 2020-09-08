# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# {name: '', size: '',  grade: '', is_frozen: , price_by_each: , custom_amount: , price_per: '', min: "1", max: "100", fresh: '' }


items = Item.create([
  {species: 'cod',name: 'Shetland Cod portions', size: '140g - 170g', fresh: 'fresh', is_frozen: false, price_by_each: true, price_per: '3.50', min: "1", max: "100",  grade: 'Superior' },
  {species: 'cod',name: 'Shetland Cod whole side', size: '1.2kg - 1.5kg', fresh: 'fresh', is_frozen: false, price_by_each: false, price_per: '15.95', min: "1", max: "100",  grade: 'Superior' },
  {species: 'salmon',name: 'Shetland Salmon portions', size: '140g - 170g',grade: 'Superior', is_frozen: false, price_by_each: true, price_per: '3.00', min: "1", max: "100", fresh: 'fresh' },
  {species: 'salmon',name: 'Shetland Salmon whole sides filleted', size: '1.5kg - 2.0kg',grade: 'Superior', is_frozen: false, price_by_each: false, price_per: '14.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'haddock',name: 'Grimsby Haddock fillets', size: '170g - 200g',grade: 'Superior', is_frozen: false, price_by_each: true, price_per: '3.00', min: "1", max: "100", fresh: 'fresh' },
  {species: 'hake',name: 'Devon hake portions', size: '140g - 170g',grade: 'Superior', is_frozen: false, price_by_each: true, price_per: '3.00', min: "1", max: "100", fresh: 'fresh' },
  {species: 'hake',name: 'Devon hake whole side fillets', size: '500g - 1kg',grade: 'Superior', is_frozen: false, price_by_each: false, price_per: '15.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'bass',name: 'Brixham wild bass (small)', size: '600g - 1kg',grade: 'Hook and Line', is_frozen: false, price_by_each: false, price_per: '16.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'bass',name: 'Brixham wild bass (large)', size: '1kg - 1.5kg',grade: 'Hook and Line', is_frozen: false, price_by_each: false, price_per: '17.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'mollusk',name: 'Shetland king scallops', size: 'Large',grade: 'Superior', is_frozen: false, price_by_each: false, price_per: '29.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'mollusk',name: 'Shetland mussels', size: 'Rope grown', grade: 'Superior', is_frozen: false, price_by_each: false, price_per: '5.50', min: "1", max: "100", fresh: 'live' },
  {species: 'other',name: 'Sashimi grade yellow fin tuna', size: 'Cut to any', fresh: 'fresh', is_frozen: false, price_by_each: false, custom_amount: true, price_per: '22.5', min: "", max: "",  grade: 'superior' },
  {species: 'flatfish',name: 'Brixham lemonsole', size: '350g - 450g', fresh: 'fresh', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '6.00', min: "1", max: "100",  grade: 'Superior' },
  {species: 'flatfish',name: 'Local whole plaice', size: '350g - 550g', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '4.00', min: "1", max: "100",  grade: 'Superior', fresh: 'fresh' },
  {species: 'other',name: 'Brixham monkfish fillet skinless and boneless', size: 'Cut to any', fresh: 'fresh', is_frozen: false, price_by_each: false, custom_amount: true, price_per: '19.95', min: "1", max: "100",  grade: 'superior' },
  {species: 'small fish',name: 'Large shetland mackerel', size: '350g - 550g',  grade: 'Superior', is_frozen: false, price_by_each: false, custom_amount: false, price_per: '6.50', min: "1", max: "100", fresh: 'fresh' },
  {species: 'small fish',name: 'Falmouth whole sardines', size: 'Whole',  grade: 'Superior', is_frozen: false, price_by_each: false , custom_amount: true, price_per: '5.95', min: "", max: "", fresh: 'fresh' },
  {species: 'small fish',name: 'Falmouth sardine fillets', size: 'Fillet',  grade: 'Superior', is_frozen: false, price_by_each: false, custom_amount: false, price_per: '8.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'mixed',name: 'Pie mix (cod, hake, salmon)', size: 'Any amount',  grade: 'Superior', is_frozen: false, price_by_each: false, custom_amount: true, price_per: '8.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'crustacean',name: 'Devon Cooked lobster', size: '500g - 550g',  grade: 'Devon', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '12.50', min: "1", max: "100", fresh: 'fresh/cooked' },
  {species: 'crustacean',name: 'Devon Hand picked crab meat (mixed)', size: '250g',  grade: '1/2 white, 1/2 brown', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '8.95', min: "1", max: "100", fresh: 'fresh/cooked' },
  {species: 'crustacean',name: 'Devon Hand picked crab meat', size: '250g',  grade: 'All white', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '14.95', min: "1", max: "100", fresh: 'fresh/cooked' },
  {species: 'crustacean',name: 'Fresh raw king prawns', size: '500g',  grade: 'From France', is_frozen: false, price_by_each: false, custom_amount: false, price_per: '18.00', min: "1", max: "100", fresh: 'fresh/raw' },
  {species: 'mollusk',name: 'Dorset oysters', size: 'Large',  grade: 'Superior', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '1.00', min: "1", max: "100", fresh: 'live' },
  {species: 'mollusk',name: 'Dorset pallourde clams', size: 'N/A',  grade: 'Superior', is_frozen: false , price_by_each: false, custom_amount: true, price_per: '10.00', min: "", max: "", fresh: 'live' },
  {species: 'haddock',name: 'Fresh natural smoked haddock', size: '350g - 600g',  grade: 'Fresh/smoked', is_frozen: false, price_by_each: false, custom_amount: false, price_per: '12.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'salmon',name: 'Scottish long sliced smoked salmon', size: '200g',  grade: 'Fresh/smoked', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '6.00', min: "1", max: "100", fresh: 'fresh' },
  {species: 'small fish',name: 'Loch fyne kippers', size: '300g - 350g',  grade: 'Fresh/smoked', is_frozen: false, price_by_each: false, custom_amount: false, price_per: '9.95', min: "1", max: "100", fresh: 'fresh' },
  {species: 'bass',name: 'Farmed bass', size: '400g - 600g', fresh: 'fresh', is_frozen: false, price_by_each: true, price_per: '5.00', min: "1", max: "100",  grade: 'Farmed in greece' },
  {species: 'other',name: 'Farmed bream', size: '400g - 600g',  grade: 'Farmed in Greece', is_frozen: false, price_by_each: true, custom_amount: false, price_per: '5.00', min: "1", max: "100", fresh: 'Fresh' },
  {species: 'mixed',name: 'Cod, bacon and brie fishcakes', size: '115g', fresh: '', is_frozen: true, price_by_each: true , price_per: '1.50', min: "1", max: "100",  grade: '' },
  {species: 'mixed',name: 'Smoked haddock and mozzarella fish cakes', size: '115g',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '1.50', min: "1", max: "100", fresh: '' },
  {species: 'mixed',name: 'Thai rosti fish cakes', size: '115g',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '1.50', min: "1", max: "100", fresh: '' },
  {species: 'crustacean',name: 'Tempura battered prawns', size: '500g',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '7.50', min: "1", max: "100", fresh: '' },
  {species: 'crustacean',name: 'Butterfly breaded king prawns', size: '500g',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '7.50', min: "1", max: "100", fresh: '' },
  {species: 'crustacean',name: 'Filo wrapped king prawns', size: '500g',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '7.50', min: "1", max: "100", fresh: '' },
  {species: 'crustacean',name: 'Shell-on cooked prawns', size: '500g',  grade: '', is_frozen: true, price_by_each: false, custom_amount: false, price_per: '9.00', min: "1", max: "100", fresh: '' },
  {species: 'crustacean',name: 'Peeled tiger prawns', size: '1kg',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '10.00', min: "1", max: "100", fresh: '' },
  {species: 'crustacean',name: 'Whole tiger prawns', size: '1kg',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '10.00', min: "1", max: "100", fresh: '' },
  {species: 'squid',name: 'Panco coated squid rings', size: '700g',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '10.00', min: "1", max: "100", fresh: '' },
  {species: 'squid',name: 'Salt and pepper squid', size: '1kg',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '15.00', min: "1", max: "100", fresh: '' } ,
  {species: 'flatfish',name: 'Breaded plaice goujons', size: '450g',  grade: '', is_frozen: true, price_by_each: true, custom_amount: false, price_per: '5.50', min: "1", max: "100", fresh: '' },
  ])