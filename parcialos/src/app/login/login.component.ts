import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsersService } from '../users/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router ) { }

  ngOnInit(): void {
    this.setDNIValidation();
  }

  loginImgSource: string = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80";

  submitted: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    // here, we specified the name of all the fields that our form has
    // in the html file, we define the name of the field in the formControlName attribute
    dni: ['', { validators: [Validators.required], updateOn: 'change' }],
    password: ['', { validators: [Validators.required, Validators.minLength(8)], updateOn: 'change' }]
  })

  get dni() {
    return this.loginForm.get('dni');
  }

  get password() {
    return this.loginForm.get('password');
  }

  setDNIValidation() {
    const dniControl = this.loginForm.get('dni');

    // validates that the DNI input field only has numbers
    dniControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
  }

  submitForm() {
    //this.submitted = true;
    this.usersService.getAll().subscribe(response=>{
      const user = response.find((a:any)=>{
        return a.dni === this.loginForm.value.dni && a.password === this.loginForm.value.password
      });
      if(user){
        alert("Login Success!!");
        this.loginForm.reset();
        this.router.navigate(['profile']);
      }else{
        alert("user not found");
      }
    })
  }

}
