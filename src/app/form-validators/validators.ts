import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { ValidatorMessage } from './validator-messages';

export function ConfirmedValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function calculateErrors(form: FormGroup | FormArray) {
  let errors = [];
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    if (control instanceof FormGroup || control instanceof FormArray) {
      errors = errors.concat(this.calculateErrors(control));
      return;
    }

    const controlErrors: ValidationErrors = control.errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((keyError) => {
        let message = field.toString() + ValidatorMessage[keyError].message;
        errors.push(message);
      });
    }
  });
  return errors;
}
