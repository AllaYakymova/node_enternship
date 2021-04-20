const {getData} = require('../helpers/getData');
// exports.addNewUser = async function (name, surname, login, email, dob, password, client, res) {
//   try {
//     mongoClient.connect((err, client) => {
//       try {
//     const user = {
//       name: name,
//       surname: surname,
//       login: login,
//       email: email,
//       dob: dob,
//       password: password,
//     };
//     await addNewUserToBd(user, client, res);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.addNewUser = async function (name, surname, login, email, dob, password, mongoClient) {
  try {
    const user = {
      name: name,
      surname: surname,
      login: login,
      email: email,
      dob: dob,
      password: password,
    };
    // let isLoginFree = getData(mongoClient, {login: `${login}`});
    // let isEmailFree = getData(mongoClient, {email: `${email}`}).then();

    // await isEmailFree.then(res =>  console.log(res));

   mongoClient.connect(async (err, client) => {
      const db = client.db('users_db');
      const collection = db.collection('users');
      // найти юзера с нужными данными
     await collection.find({login: `${login}`}).toArray((err, results) => {
          console.log("results", results);
          client.close();
          return results
        });
      //вставить юзера в бд
    //   collection.insertOne(user, (err, result) => {
    //     try {
    //       console.log('Inserted data:', result.ops);
    //     } catch (err) {
    //       console.log(err);
    //     } finally {
    //       client.close();
    //     }
    //   });
    });
  } catch (err) {
    console.log(err);
  }
};
