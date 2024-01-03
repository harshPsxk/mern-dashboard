
mongo db  running instance ( use docker to start a mongo db deployment)

provide the connection string for that deployment in the env file 

and replace the previous variable DB_URI='mongodb://localhost:27017' here you have to provide your own uri that is of the docker 

for starting the backend server is in the root file called "server.js"
just run node server.js 

for starting the front end open a new parallel terminal in the vs code or any code editor, navigate to client directory present in the 
root folder

run npm start for starting the react app. 

for registering new user there will a form that will hold company drop down select for what company the user belongs to.
next the type of device that user wants to monitor select the device 
finally the permission there are total 5 
'dashboard', 
  'alerts:list',
  'alerts:manage',
  'access-control:list',
  'access-control:manage',

if user is not given dashboard the user won be allowed to sign in to the dashboard. 

i am commiting env file though it is not recommmened just for the project simplicity. 



