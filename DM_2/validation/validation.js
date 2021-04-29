
exports.validationSchema = function (...arg) {
  const [name, phone, email, products] = arg;

  const keyCheck = products.map(prod => Object.keys(prod).some(el => el !== 'id' && el !== 'count')).filter(el => el !== false).length;
  const idCheck = products.some(prod => !Number.isInteger(+prod.id));
  const regName = /^[a-zA-zА-яа-я -]+$/;
  const regEmail = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/;
  const regPhone = /^[-\s\/0-9]{10}$/;

  return {
    name: name.length >= 4 && name.length <= 50 && regName.test(name),
    email: email ? regEmail.test(email) : true,
    phone: phone && regPhone.test(phone),
    dataFields: keyCheck === 0,
    id: !idCheck
  };
};
