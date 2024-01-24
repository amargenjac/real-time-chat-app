# real-time-chat-app
### Running the app
To run the application first clone the project and install needed dependencies.

To install server dependencies, from project root folder, run:
- cd server
- npm install

After the installation is complete run:
- cd ..
- cd client
- npm install

With these commands you will finish instalation of required dependencies for the client side of the application.

#### Custom config file
To run the application, this application requires a custom configuration file, format of the file should be as it is below:

![Screenshot 2024-01-24 011424](https://github.com/amargenjac/real-time-chat-app/assets/76213933/a11053c6-976c-406a-9bd4-11881a69fc08)

This file should be saved under **server/src/config/config.js**

### Starting the client and server
After the config file is set, from root folder run the commands:
- cd server
- npm start

These commands will start the server of the application, and after that you need to run:

- cd ..
- cd client
- npm run serve

After running these commands, application is ready. 

In Postman folder of the application you can find exported collection used for testing the application.

Frontend and the real-time aspect of the application is not fully functional. Regarding the real-time aspect, users can see who is online and available for chatting. Online users are displayed on the left side of the home page, while the users chats are displayed on the right side of the home page.
