const checkRequiredFields = (requiredFields, parsedData) =>
  requiredFields.filter((field) => !parsedData[field]);

export default checkRequiredFields;
