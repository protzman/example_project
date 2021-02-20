# larvis ui.

Bootstrapped with Create React App and built with Typescript, Material-ui, and Redux. This is both a desktop friendly app as well as mobile friendly. Open the developer tools in Chrome and click thee 'Toggle Device Toolbar' in the top left to view on other screen sizes.

### To Run :
- Make sure the docker container containing the Larvis api is running in the background at port `:8080` as that is where the ui sends its requests. If you are having trouble running the docker container follow these steps :

  ```
  // First get into the directory where the Dockerfile is located. It works easiest in a linux environment but if you are on windows consider downloading WSL (Windows Subsystem Linux). Run the following commands.

  docker build -t larvis-api .

  docker run -p 8080:8080 larvis-api
  ```
- Once the api is up and running you can start the front end with `npm run start` fromt he project's directory.
