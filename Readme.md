
Mongo db  running instance ( use docker to start a mongo db deployment)

Provide the connection string for that deployment in the env file and replace the previous variable DB_URI='mongodb://localhost:27017' here you have to provide your URI that is of the docker 

To launch the backend server, you can just navigate to the root directory of your project and then go ahead and execute 
-node server.js.

Open a new terminal in Visual Studio Code or any code editor you choose for the front end. Navigate to the client directory located in the root folder. Start the React application by running 
-npm start.

The user registration process involves a form where:

The user selects their company from a dropdown menu.

The user is assigned permissions. There are five permissions available:

-'dashboard'
-'alerts:list'
-'alerts:manage'
-'access-control:list'
-'access-control:manage'

Important: Users must have the 'dashboard' permission to access and sign in to the dashboard.

Note: For simplicity, the .env file is included in the repository, although it is generally not recommended for security reasons.



