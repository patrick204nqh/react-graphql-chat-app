# Deploy a NodeJS app to AWS EC2

## Prepare the code

1. Update client links to be ralative to new host
2. Create a .env and use env vars for DB credentials
3. Push the code to a git repo

## Set up the EC2 instance:

1. Lauch an EC2 instance
2. Connect to it and install NodeJS on it

## Set up the RD2 instance:

1. Lauch an RDS instance
2. Set up a user and password for the server to access it
3. Connect to it and create your app's schema

## Set up nginx

1. Install nginx
2. Update server blocks and map / to client and /graphql to server
3. Build client files and copy them to where nginx is serving from

- refer:
  > https://www.youtube.com/watch?v=rE8mJ1OYjmM&t=557s
