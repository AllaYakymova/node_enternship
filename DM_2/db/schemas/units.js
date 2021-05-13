
const getUnitsSeed = (arr) => arr.map((el, i) => {
  return {
    id: i + 1,
    unit: el
  }
});

const data = ['1 kg', '0.5 kg', '0.25 kg', '0.3 kg', '0.48 kg', '0.15 kg', '0.22 kg', '0.226 kg', '0.33 L', '0.5 L', '1 L', '1.6 L','1.75 L','2 L', '1 pack'];

module.exports = getUnitsSeed(data);

