# News-Explorer-Frontend

This is the frontend of "Whats going in the world" MERN Stack App

Backend (Express & MongoDB) repo is: [here](https://github.com/staskavi/news-explorer-api)

The link to [deployed App](https://whatsgoingintheworld.students.nomoredomainssbs.ru)

## Project Features

- User authentication and authorisation.
- Search feature for articles using a [News API](https://newsapi.org/)
- Articles can be saved and removed after user's authentication.
- Design is responsive.

## Hosting details

- Hosted on Google cloud.
- Running on Ubuntu 20 & NginX protected with SSL certificte by Certbot.
- Domain of API - [API](https://api.whatsgoingintheworld.students.nomoredomainssbs.ru)
- Public IP: 35.203.165.67

## How to run locally

- Download and Open Backend repo on your local machine first run "npm install" and than run "npm run dev" command.
- Backend will be available on localhost:1337
- Download and Open Frontend repo on your local machine.
- Comment second line in src/utils/constant.js
- Uncomment first line in src/utils/constant.js
- Run "npm install" and than run "npm run start" command, the App will be available on localhost:3000

