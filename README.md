## fish-man-dan stripped back version
This is a full stack (react on rails) combination of a more bare bones/simplified version of previous repos 'fish-man-dan-frontend' and 'fish-man-dan-backend'.
It was created in tandem with a client's requests for an easy to use online order portal. It features an intuitive, step-by-step system, combined with e-mail validation for security reasons and a page for viewing digital order receipts.

# Important note
This version, although fully operational, WILL NOT ACTUALLY PLACE ANY ORDERS WITH THE MERCHANT (although this should be apparent as neither the front nor backend have been launched) - i.e. it is safe to 'place' orders if one so wishes without consequence, other than receiving a confirmation e-mail for each order placed.

# To use
This works like any other react on rails application, as hopefully should be very simple to run if these steps are followed:
 - Fork and clone this repo
 - Within this repo, first move into the 'rails-server' directory, and run 'bundle install' in the CLI
 - Run 'rails s' to start the server, making sure it runs on 'localhost:3000'
