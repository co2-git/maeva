const convertValue = (value, type, options) =>
new Promise(async (resolve, reject) => {
  try {
    let converted;
    const convertedField = type.convert(value, options);
    if (convertedField instanceof Promise) {
      try {
        converted = await convertedField;
      } catch (error) {
        converted = value;
      }
    } else {
      converted = convertedField;
    }
    resolve(converted);
  } catch (error) {
    reject(error);
  }
});

export default convertValue;
