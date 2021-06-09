export const ValidatorMessage = {
  required: { message: ' is required.' },
  minlength: {
    message: ' must be at least 6 characters long.',
  },
  maxlength: {
    message: ' cannot be more than 25 characters long.',
  },
  pattern: {
    message: ' pattern is invalid, Please follow the hints',
  },
  validName: {
    message: 'Your Name has already been taken.',
  },
  confirmedValidator: {
    message: "Password doesn't match",
  },
  passwordValidator: {
    message:
      ' pattern is invalid, use the letters both uppercase and lowercase and numbers',
  },
  email: { message: ' address is invalid' },
};
