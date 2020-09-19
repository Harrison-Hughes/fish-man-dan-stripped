## fish-man-dan order portal // stripped back version

This is a full stack (react on rails) and simplified combination of previous repos 'fish-man-dan-frontend' and 'fish-man-dan-backend'.
It was created in tandem with a client's requests for an easy to use online order portal (the client in question being a seafood merchant operating in the south of England). It features an intuitive, step-by-step system, to browse produce and place orders, combined with e-mail validation for security reasons and a page for viewing digital order receipts.

#### Important note

This version, optimised for demonstrative purposes, although fully operational will NOT actually place any orders with the merchant - i.e. it is safe to 'place' orders if one so wishes without consequence, other than receiving a confirmation e-mail for each order (necessary to access the digital order receipt).

#### Features

The structure of the application was developed in tandem with the client, with an emphasis on accessibility and ease of ordering. As of such, it has been designed in three main parts:

- Browse: where a potential customer can simply see the available stock, and add to a basket (saved via. localStorage) if they wish
- Checkout: where a customer can enter their order details, including an address for delivery and an e-mail address with which to confirm their order
- Receipt: accessible by following a link in their confirmation e-mail (which registers the order as valid to the database), this is where a customer is able to review their order, track it's status, and cancel it if they wish.

#### To use

This works like any other react on rails application, and as such should (hopefully) be very simple to run:

- Fork and clone into this repository
- Move into the 'rails-server' directory, and run 'bundle install' in the CLI to establish the gemfile.lock file
- Run 'rails db:create db:migrate db:seed' to establish the database
- Run 'rails s' in the CLI to start the server, making sure it runs on 'localhost:3000'
- Leaving the rails server running, in another terminal window move into the 'react-client' directory.
- Run 'npm start' in the CLI to start the front end of the application (it should give you the option to run it at 'localhost:3001' if 'localhost:3000' is being used by the rails server).
- If, for whatever reason, the rails server is running somewhere other than 'localhost:3000', the API endpoint can be changed at: react-client/src/Constants.js (see BASE_URL)

Thanks for reading! 😊
