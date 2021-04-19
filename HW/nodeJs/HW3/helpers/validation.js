exports.validationSchema = function (...arg) {
  let [name, surname, login, email, dob, password] = arg;

  const regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,50}$/;
  const regEmail = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/;
  let date = new Date(dob);
  let now = new Date();
  const isValid = {
    name: name.length >= 1 && name.length <= 50,
    surname: surname.length >= 1 && surname.length <= 50,
    login: login && login.length >= 1 && login.length <= 50,
    email: email && regEmail.test(email),
    dob: Date.parse(date) < Date.parse(now),
    password: password && regPassword.test(password),
  };
  console.log(isValid);

  return !Object.values(isValid)
    .some(el => el !== true);
};





// const dateCorrect = `${dob.slice(-2)}/${dob.slice(5,7)}/${dob.slice(0,4)}`;
