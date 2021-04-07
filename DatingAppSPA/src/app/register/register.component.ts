import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { User } from '../_models/user';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //@Input() valuesFromHome:any;
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private notifier: NotifierService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  register() {
    // console.log(this.registerForm);

    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.Register(this.user).subscribe(() => {
        //console.log('Register successful');
        this.notifier.notify('success', "Register Successed!");
      }, error => {
        console.log(error);
        this.notifier.notify('error', error.error);
      }, () => {
        this.authService.Login(this.user).subscribe(() => {
          this.router.navigate(['/matches']);
        });
      });
    }

  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancel')
  }

}
