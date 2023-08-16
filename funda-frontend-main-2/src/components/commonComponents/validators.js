export function validateEmail(text) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

export function validatePhoneCountry(text) {
  const number = parseInt(text)
  var re = /^\+([0-9]{1,20})$/;
  return re.test(number);
}

export function validatePhone(text) {
  var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,6}$/;
  return re.test(text);
}

export function validateNumeric(text) {
  const number = parseInt(text)
  var re = /^[0-9]$/;
  return re.test(number);
}

export function validateNumber(text) {
  var re = /^[0-9]{0,1000}$/;
  return re.test(text);
}

export function validateName(text) {
  var re = /^[a-zA-Z ]{3,30}$/;
  return re.test(text);
}

export function validateAddress(text) {
  var re = /^[a-zA-Z0-9+-/,.#':"` ]{6,200}$/;
  return re.test(text);
}

export function validateCNIC(text) {
  var re = /^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$/;
  return re.test(text);
}

export function validatePassword(text) {
  var re = /^.{8,}$/;
  return re.test(text);
}

export function validateRequired(text) {
  var re = /^\S*$/;
  return re.test(text);
}

export function validateDate(text) {
  var re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return re.test(text);
}

export function validateString(text) {
  var re = /^[A-Za-z ]+$/;
  return re.test(text);
}

export function validateURL(text) {
  var re =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  return re.test(text);
}
