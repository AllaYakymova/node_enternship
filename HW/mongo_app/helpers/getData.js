
const MongoClient = require("mongodb").MongoClient;

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useUnifiedTopology: true });


const getData = async function (mongoClient, query) {
 mongoClient.connect((err, client) => {
    try {
      const db = client.db('users_db');
      const collection = db.collection('users');

      // найти юзера с нужными данными
    collection.find(query)
        .toArray((err, results) => {
          console.log("results", results);
          client.close();
          return results
        });
    } catch (e) {
      console.log(e);
    }
  });
};
// let x = getData(mongoClient, {name: 'Tom'});
// console.log(x);

