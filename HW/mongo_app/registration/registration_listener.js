
const inputs = {
  name: document.querySelector('#inp-name'),
  surname: document.querySelector('#inp-surname'),
  login: document.querySelector('#inp-login'),
  email: document.querySelector('#inp-email'),
  phone: document.querySelector('#inp-phone'),
  dob: document.querySelector('#inp-dob'),
  password: document.querySelector('#inp-pwd'),
};

document.querySelector('.form-reg').addEventListener('submit', (ev) => {
  ev.preventDefault();

  const name = inputs.name.value;
  const surname = inputs.surname.value;
  const login = inputs.login.value;
  const email = inputs.email.value;
  const dob = inputs.dob.value;
  const dobCorrected = `${dob.slice(0,4)}/${dob.slice(5,7)}/${dob.slice(-2)}`;
  const password = inputs.password.value;

  fetch(`http://localhost:8080?type=reg&name=${name}&surname=${surname}&login=${login}&email=${email}&dob=${dobCorrected}&password=${password}`)
    .then(res => res.text())
    .then();
});
