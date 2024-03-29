# example_project ui.

Bootstrapped with Create React App and built with Typescript, Material-ui, and Redux. This is both a desktop friendly app as well as mobile friendly. Open the developer tools in Chrome and click the 'Toggle Device Toolbar' in the top left to view on other screen sizes.

### To Run :
- Make sure the docker container containing the example_project api is running in the background at port `:8080` as that is where the ui sends its requests. If you are having trouble running the docker container follow these steps :

  ```
  /**
   * First get into the directory where the Dockerfile is located. It works easiest in a linux environment but  
   * if you are on windows consider downloading WSL (Windows Subsystem Linux). Run the following commands.
   */

  docker build -t example_project-api .

  docker run -p 8080:8080 example_project-api
  ```
- Once the api is up and running you can start the front end with `npm run start` from the project's directory.


### API Recommendations
 - The most useful recommendation would be to have better control over the data from the api. This could be done by providing more endpoints in relation to the acquisitions
  
    ```
    GET: Get all acquisitions in a single day
    /acquisitions/<timestamp>
    ```
    This would alleviate some of the heavy filtering that has to take place on the front end to make sense of the data.
 - It could be fun to include some more fields on the users - like birtday or bio, as just the users' names and user ids aren't worth displaying themselves.
 - It would be useful to return the `name` field from the response of `/token` like so:
    ```
    { access: 'token_in_here', name: 'name_of_user_here' }
    ```
    This would be nice so you don't have to go out and fetch the user right away if you wanted to display who has signed in for example in the header. I ended up going and fetching the current signed in user after signing in for this reason, but if I had the name returned with the token I could just wait off on the request until I wen't to gather all users, or update the signed in user

### Desktop Screenshots
---
Sign in page
![signin](./screenshots/larvis_signin.PNG)

Home page
![home](./screenshots/larvis_home.PNG)

Home page (cont.)
![home_2](./screenshots/larvis_home_2.PNG)

View all users
![users](./screenshots/larvis_users.PNG)

Update a user
![update_user](./screenshots/larvis_update_user.PNG)

### Mobile Screenshots
---
Sign in page

![signin_mobile](./screenshots/larvis_signin_mobile.PNG)

Home page

![signin_mobile](./screenshots/larvis_home_mobile.PNG)

Home page (cont.)

![signin_mobile](./screenshots/larvis_home_mobile_2.PNG)

Home page (cont.)

![signin_mobile](./screenshots/larvis_home_mobile_3.PNG)

View all users

![signin_mobile](./screenshots/larvis_users_mobile.PNG)

Update a user

![signin_mobile](./screenshots/larvis_update_user_mobile.PNG)

