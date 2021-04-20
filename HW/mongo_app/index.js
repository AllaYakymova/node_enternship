const http = require('http'); //HTTP-модуль
const url = require('url'); //url parser module
const express = require("express");
const {answer} = require('./helpers/answer');
const {addNewUser} = require('./registration/reg_func_mongo');
const {validationSchema} = require('./helpers/validation');
const {getData} = require('./helpers/getData');
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;

const app = express();
const jsonParser = express.json();
// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });







http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credential', 'true');

  const query = url.parse(req.url, true).query;
  const {type} = query;

  // обработка полученных данных
  switch (type) {
    case 'reg' : {
      const {name, surname, login, email, dob, password} = query;
      let isValid = validationSchema(name, surname, login, email, dob, password);
      if (isValid) {
        addNewUser(name, surname, login, email, dob, password, mongoClient)
          .then(() => console.log('done'));
      } else {
        answer(res, 406, 'Registration data is not valid');
      }
      break;
    }
    case 'auth' : {
      const {login, password} = query;
      // checkAuth(login, password, client, res);
      break;
    }
    default: {
      answer(res, 'Error in request type');
    }
  }
})
  .listen(8080);


console.log('Server on http://localhost:8080');

// создаем объект MongoClient и передаем ему строку подключения

// mongoClient.connect((err, client) => {
//   try {
//     addNewUser()
    //вставить юзера в бд
    // let user = {name: "Tom", surname: "Hanks", login: "hanks", email: "tom@gmail.com", dob: "1999-12-11", password: "fet6Yg"};
    // collection.insertOne(user, (err, result) => {
    //   try {
    //     console.log(result.ops);
    //   } catch (err) {
    //     console.log(err);
    //   } finally {
    //     client.close();
    //   }
    // })

    // найти юзера с нужными данными
    // collection.find({name: "Tom"}).toArray((err, results) => {
    //   console.log(results);
    //   client.close();
    // });

    // Удалить данные с параметрами
    // db.collection("users").deleteMany({name: "Tom"}, (err, result) => {
    //   console.log(result.result);
    //   client.close();
    // });
  // } catch (e) {
  //   console.log(err);
  // }
// });



// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test_bd')
//   .then(() => console.log('MongpDB has started'))
//   .catch(err => console.log('MongpDB has error:', err));
