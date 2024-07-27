import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 === val2) {
      return null;
    }

    return { valuesNotEqual: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),

    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
    }),

    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', [Validators.required]),

    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    agree: new FormControl(false, [Validators.requiredTrue]),
  });

  onSubmit() {
    if (this.form.invalid) {
      console.log('Form is invalid!');
      return;
    }

    console.log(this.form);
  }

  onReset() {
    this.form.reset();
  }
}
