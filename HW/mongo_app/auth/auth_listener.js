const auth = {
  login: document.querySelector('#auth-login'),
  password: document.querySelector('#auth-pwd'),
};

document.querySelector('.form-auth').addEventListener('submit', ev => {
  ev.preventDefault();

  const login = auth.login.value;
  const password = auth.password.value;

  fetch(`http://localhost:8080?type=auth&login=${login}&password=${password}`)
    .then(res => res)
    .then(console.log);
});
