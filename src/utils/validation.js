// возвращаемые сообщения ошибок
const errors = {
  required: 'Это обязательное поле',
  text: 'Введите от 2 до 30 символов',
  email: 'Введите правильный email',
  url: 'Введите ссылку на картинку',
  password: 'Пароль должен состоять как минимум из 8 символов',
}

// принимает на вход форму и проверяет все ее поля на валидность, исходя из этого возвращает true или false 
function checkFormValidity(form) {
  const inputs = Array.from(form.elements);

  if (inputs.every(elem => elem.validity.valid)) {
    return true
  } else {
    return false
  }
}

/* принимает на вход input и возвращает объект, в который при невалидности
попадает текст ошибки */
export default function validate(field) {
  const validity = { isFormValid: true, error: '' };
  validity.isFormValid = checkFormValidity(field.form);

  if (field.validity.valueMissing) {
    validity.error = errors.required;
    return validity
  }
  if (field.validity.tooShort && field.type === 'password') {
    validity.error = errors.password;
    return validity
  } 
  if (field.validity.tooShort || field.validity.tooLong) {
    validity.error = errors.text;
    return validity
  }
  if (field.validity.typeMismatch && field.type === 'url') {
    validity.error = errors.url;
    return validity
  }
  if (field.validity.typeMismatch && field.type === 'email') {
    validity.error = errors.email;
    return validity
  }

  return validity;
}