const productsIdOptions = document.querySelector('#product_id_select');
const productsCountOptions = document.querySelector('#product_count_select');
const addToCartButton = document.querySelector('#add_to_cart');
const cartBoard = document.querySelector('#order_info');
const senOrderButton = document.querySelector('#send_order');

document.addEventListener('DOMContentLoaded', () => {
  fetch(`http://localhost:8080/products`)
    .then(res => res.json())
    .then(res => {
      const data = res.data;
      console.log(data);

      function insertOptions(data) {
        let fragment = new DocumentFragment();
        if (data) {
          data.forEach(el => {
            let option = document.createElement('option');
            option.setAttribute('value', `${el.id}`);
            option.append(el.product_name);
            fragment.append(option);
          });
        } else {
          for (let i = 1; i <= 15; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', `${i}`);
            option.append(i);
            fragment.append(option);
          }
        }
        return fragment;
      }

      productsIdOptions.append(insertOptions(res.data));
      productsCountOptions.append(insertOptions());
    })
    .catch(err => console.log(err));
});

let order = [];
addToCartButton.addEventListener('click', e => {
  const productId = productsIdOptions.value;
  const count = productsCountOptions.value;
  console.log(productId);
  order.push({id: productId, count: count});
  fetch(`http://localhost:8080/products/${productId}`)
    .then(res => res.json())
    .then(res => {
      const data = res.data[0];
      console.log(data);
      cartBoard.insertAdjacentHTML('beforeend', `<p>Name: ${data.product_name}</p><p>Manufacture: ${data.manufacture}</p><p>Price: ${data.price}</p><p>Count: ${count}</p>`);
    })
    .catch(err => console.log(err));
});

const auth = {
  name: document.querySelector('#name'),
  phone: document.querySelector('#phone'),
  email: document.querySelector('#email'),
};

senOrderButton.addEventListener('click', () => {
  const name = auth.name.value;
  const phone = auth.phone.value;
  const email = auth.email.value;

  let body = { products: order, user:{name: name, phone: phone, email: email}};
  console.log(JSON.stringify(body));
  fetch(`http://localhost:8080/order`,
    {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res)
});
