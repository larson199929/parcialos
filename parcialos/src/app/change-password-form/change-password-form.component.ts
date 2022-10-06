import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent implements OnInit {

  submitted: boolean = false;

  changePasswordForm: FormGroup = this.formBuilder.group({
    email: ['', {validators: [Validators.required, Validators.email], updatedOn: 'change'}],
    password: ['', { validators: [Validators.required, Validators.minLength(5)], updatedOn: 'change' }],
    confirmPassword: ['', {validators: [Validators.required, Validators.minLength(5)], updatedOn: 'change'}],
  }, {
    validator: this.MustMatch('password','confirmPassword')
  }
  );

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //this.setPhoneValidation();
  }


  //Properties
  get email(){
    return this.changePasswordForm.get('email');
  }

  get password(){
    return this.changePasswordForm.get('password');
    }
    
    get confirmPassword(){
        return this.changePasswordForm.get('confirmPassword');
      }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
 
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true })
      }
      else {
        matchingControl.setErrors(null);
      }
    }
  }
  
  submitForm(){ 
    console.log(this.changePasswordForm.valid);
    this.submitted = true;
  }

}