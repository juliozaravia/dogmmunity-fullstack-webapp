# Dogmmunity
## 1. What's Dogmmunity?
Dogmmunity is a **fullstack web application** that allows you to list multiple breeds of dogs, to achieve this **it consumes the data from the API:** TheDogAPI (https://thedogapi.com/) **and mixes it with the data extracted from the application's database.**

Once the data has been combined and loaded, the application allows filtering and / or sorting them by race, weight or name. It also allows you to access the details of each dog breed and create personalized dog breeds that will be stored in the database of the web application.

## 2. Is there a Live Demo?
**There will be**, I'm working on it, so very soon you will see the link of the demo in this section :).

## 3. What technologies / resources were used?
This application was built using a set of technologies such as:
- **ReactJS.** For creating and managing components.
- **Redux.** To handle the global state of the application.
- **Redux-Thunk.** As a middleware to properly handle data fetching.
- **Axios.** To fetch data.
- **Express.** To build and manage the server-side application logic.
- **Sequelize.** To manage the connection, create the models and simplify the management with the database.
- **PostgreSQL.** To store the data extracted from the API and the data registered by the users of the web application.

Additionally I separated the code into folders to keep an organized structure. In this way, any visitor can understand the code without problems. The final structure of the project is:

![](https://i.ibb.co/Z2R79Kc/dogmmunity-structure.jpg)

## 4. About connecting to the database.
An `.env` file has been used to allocate the data that allows the connection to the database. The variables contained in the `.env` file are then imported by the `api/src/utils/globals.js` file. **Take this detail into consideration if you want to download and configure this web application for personal use. 
**
## 5. Check out a short clip of how Dogmmunity works.
It's my responsibility to tell you (before you hit "Play") that I'll defend with my life the color combination I used for the design :). 

[VIDEO] **[Puedes ver el video haciendo click aquí. ](https://www.youtube.com/watch?v=CzQJeRS387U "Puedes ver el video haciendo click aquí. ")**

And here are some screenshots:

**- Landing page:**
![](https://i.ibb.co/HH2fpDc/dogmmunity-1.jpg)

**- Home page:**
![](https://i.ibb.co/DpnrdS3/dogmmunity-2.jpg)

**- Dog breed detail:**
![](https://i.ibb.co/PZLHfQH/dogmmunity-3.jpg)

**- Dog breed registry:**
![](https://i.ibb.co/chmgxf4/dogmmunity-4.jpg)

## Anything else?
- All constructive criticisms are very well received, you can send them to me at julio.zaravia.dev@gmail.com.
- If you're going to criticize this project in an offensive way, please don't do it, remember that no one comes to this world knowing everything.
- If you want to improve the code, you're free to do so, just let me know what you changed or improved so I can learn from you.
- I know my English is a bit poor, but I'm improving little by little. Thanks for understand.
- That's it, I really liked learning from this project and refactoring it, if you took the time to read this, you're a good person and I wish you a good day.
