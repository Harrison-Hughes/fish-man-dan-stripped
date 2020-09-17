## fish-man-dan order portal (stripped back version)
This is a full stack (react on rails), simplified combination, of previous repos 'fish-man-dan-frontend' and 'fish-man-dan-backend'.
It was created in tandem with a client's requests for an easy to use online order portal. It features an intuitive, step-by-step system, to browse produce and place orders, combined with e-mail validation for security reasons and a page for viewing digital order receipts.

#### Important note
This version, although fully operational, WILL NOT ACTUALLY PLACE ANY ORDERS WITH THE MERCHANT (although this should be apparent as neither the front nor backend have been launched) - i.e. it is safe to 'place' orders if one so wishes without consequence, other than receiving a confirmation e-mail for each order (necessary to access the digital order receipt).

#### To use
This works like any other react on rails application, as hopefully should be very simple to run if these steps are followed:
 - Fork and clone into this repository
 - First, move into the 'rails-server' directory, and run 'bundle install' in the CLI to establish the gemfile.lock file
 - Then, run 'rails db:create db:migrate db:seed' to establish the database
 - Run 'rails s' in the CLI to start the server, making sure it runs on 'localhost:3000'
 - Leaving the rails server running, in another terminal window change into the 'react-client' directory.
 - Run 'npm start' in the CLI to start the front end of the application (it should give you the option to run it at 'localhost:3001' if 'localhost:3000' is being used by the rails server). HOWEVER, if, for whatever reason, the rails server is running somewhere other than 'localhost:3000', the API endpoint can be changed at: react-client/src/Constants.js (see BASE_URL) 
 
Thanks for reading! :)
