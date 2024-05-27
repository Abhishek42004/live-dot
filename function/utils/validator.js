export class Validator {
  constructor() {
  }
  validate(data, schema, errors = {}) {
      if (!data) {
          errors._general = "No data provided";
          return errors;
      }
      for (const key in schema.properties) {
          if (schema.properties.hasOwnProperty(key)) {
              const propertySchema = schema.properties[key];
              const value = data[key];
              const validate = propertySchema.validate;
              if (validate) {
                  if (validate.required && value === undefined) {
                      errors[key] = `${key} is required`;
                      continue;
                  }

                  if (value !== undefined) {
                      let result;
                      switch (propertySchema.type) {
                          case 'string':
                              result = this.validateString(value);
                              if (!result) {
                                  errors[key] = `${key} is not a valid ${propertySchema.type}`;
                              }
                              break;
                          case 'integer':
                              result = this.validateInteger(value);
                              if (!result) {
                                  errors[key] = `${key} is not a valid ${propertySchema.type}`;
                              }
                              break;
                          case 'boolean':
                              result = this.validateBoolean(value);
                              if (!result) {
                                  errors[key] = `${key} is not a valid ${propertySchema.type}`;
                              }
                              break;
                          case 'array':
                              result = this.validateArray(value);

                              if (!result) {
                                  errors[key] = `${key} is not a valid ${propertySchema.type}`;
                              }
                              break;
                          case 'object':
                              this.validate(value, propertySchema, errors[key] = {});
                              break;
                          default:
                              console.log("Not working");
                              break;
                      };
                      if (validate.minimum !== undefined) {
                          const result = this.checkMin(value, validate.minimum);
                          if (!result) {
                              errors[key] = `${key} must be at least be greater than ${validate.minimum}`;
                          }
                      }
                      if (validate.maximum !== undefined) {
                          const result = this.checkMax(value, validate.maximum);
                          if (!result) {
                              errors[key] = `${key} must be at least be smaller than ${validate.maximum}`;
                          }
                      }
                      if (validate.minLength) {
                          const result = this.checkMinLength(value, validate.minLength)
                          if (!result) {
                              errors[key] = `${key} character should be greater than ${validate.minLength}`;
                          }
                      }
                      if (validate.maxLength) {
                          const result = this.checkMaxLength(value, validate.maxLength);
                          if (!result) {
                              errors[key] = `${key} character should be smaller than ${validate.maxLength}`;
                          }
                      }
                      if (validate.pattern) {
                          const result = this.checkPattern(value, validate.pattern);
                          if (!result) {
                              errors[key] = `${key} does not match the pattern ${validate.pattern}`;
                          }
                      }
                      if (validate.format === 'email') {
                          const result = this.checkEmailFormat(value);
                          if (!result) {
                              errors[key] = `${key} does not has valid format`;
                          }
                      }
                      if (validate.maxItems !== undefined) {
                          const result = this.checkMaxItems(value, validate.maxItems);
                          if (!result) {
                              errors[key] = `${key} exceeds max-items that is ${validate.maxItems}`;
                          }
                      }
                      if (validate.minItems !== undefined) {
                          const result = this.checkMinItems(value, validate.minItems);
                          if (!result) {
                              errors[key] = `${key} is less than min-items that is ${validate.minItems}`;
                          }
                      }
                      if (validate.uniqueItems === true) {
                          const result = this.checkUniqueItems(value);
                          if (!result) {
                              errors[key] = `${key} contains duplicate key`;
                          }
                      }
                  }

              } else if (propertySchema.type === 'object') {
                  this.validate(value, propertySchema, errors[key] = {});
              } else if (propertySchema.type === 'array') {
                  const myErrors = [];
                  for (const valueChild in value) {
                      const currentError = this.validate(value[valueChild], propertySchema.items, errors[key] = {});
                      // console.log("hi", currentError);
                      myErrors.push(currentError);
                      errors[key] = myErrors
                  }
              }
          }
      }

      return errors;
  }
  validateString(value) {
      if (typeof value !== 'string') {
          return false;
      }
      return true;
  }
  validateInteger(value) {
      if (!Number.isInteger(value)) {
          return false;
      }
      return true;
  }

  validateBoolean(value) {
      if (typeof value !== 'boolean') {
          return false;
      }
      return true;
  }
  validateArray(value) {
      if (!Array.isArray(value)) {
          return false;
      }
      return true;
  }
  checkMin(value, minimum) {
      if (value < minimum) {
          return false;
      }
      return true;
  }
  checkMax(value, maximum) {
      if (value > maximum) {
          return false;
      }
      return true;
  }
  checkMinLength(value, minLength) {
      if (value.length < minLength) {
          return false;
      }
      return true;
  }
  checkMaxLength(value, maxLength) {
      if (value.length > maxLength) {
          return false;
      }
      return true;
  }
  checkPattern(value, pattern) {
      if (!new RegExp(pattern).test(value)) {
          return false;
      }
      return true;
  }
  checkEmailFormat(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
          return false;
      }
      return true;
  }
  checkMaxItems(value, maxItems) {
      if (value.length > maxItems) {
          return false;
      }
      return true;
  }
  checkMinItems(value, minItems) {
      if (value.length < minItems) {
          return false;
      }
      return true;
  }
  checkUniqueItems(value) {
      if (new Set(value).size !== value.length) {
          return false;
      }
      return true;
  }
}

