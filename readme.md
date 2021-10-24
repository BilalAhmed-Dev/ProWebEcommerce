# ProWebEcommerce E-Commerce Project

> Complete E-commerce site built with Node.js, React, Redux, Express, MongoDB

### Env Variables

Add your config variables values in the config.env file in backend/config folder


### Version 1 :
* The data is stored in a hosted Mongo database
version 1 is hosted [HERE!](https://prowebecommerce.herokuapp.com/)

An E commerce platform made using React JS, Redux, MongoDB ,mongoose,express, JWT Tokens(Authentication),Stripe API (temporarily creating dummy payment gateway)

The application is composed of the following Features:

### Front-End
* A landing page with animated minimalistic design, with 5 items per page.
* A page with Sign-in and Sign-out components.
* All form related fields are made using reusable components.
* Has a cart feature which opens up and displays the items selected in a summary, also has a checkout button.
* The cart component also allows to edit the contents of the items selected.
* Search feature with Categoires and price filtering
* Pagination
* Check out features. 


### Backend

* As of this moment I am using MongoDB for data and mongoose to connect to a hosted database
* It is also used to store all the data 
* I am also using Express to define routes and middlewares as well as other packages in-order to build a complete backend API that recieves requests and sends back responses
* I am using JWT tokens in-order to implement user's Authentication and Authorization allowing different resource access to users and admins

## Developed With

* [Visual Studio Code](https://code.visualstudio.com/) - A source code editor developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded Git control, syntax highlighting, intelligent code completion, snippets, and code refactoring
* [React](https://reactjs.org/) - A javascript library for building user interfaces
* [Redux](https://redux.js.org/) - A predictable state container to share data across the entire application.
* [MongoDB](https://www.mongodb.com/) A document-oriented database program
* [Mongoose](https://mongoosejs.com/) An npm package that facilitates implementing queries and connecting to MongoDB
* [Express](https://expressjs.com/) A back end web application framework for Node.js,

---


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The following software is required to be installed on your system:

* Node
* Npm

### Install

Follow the following steps to get development environment running.



  ```bash
  git clone https://github.com/BilalAhmed-Dev/ProWebEcommerce.git
  ```

   _OR USING SSH_

  ```bash
  git clone https://github.com/BilalAhmed-Dev/ProWebEcommerce.git
  ```

### Install Dependencies (Frontend)

```
cd frontend
npm i
```

### Install Dependencies (Backend)

```
npm i
```

### Seed Database

Use the following commeand to put some dummy products in that database.
Run it in the root folder.

```
npm run seeder
```

### Start the app
```
npm run dev
```
