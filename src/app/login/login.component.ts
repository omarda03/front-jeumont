import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage!: string;
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService, 
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  
  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
  
  ngOnInit() {}

  loginUser() {
    this.loading = true ;
    this.errorMessage = ''; 

    if ( this.loginForm.valid ) {
      const email = this.loginForm.value.email as string; 
      const password = this.loginForm.value.password as string; 
      this.authService.login(email, password).subscribe(
        () => { this.loading = false },
        (error) => {
          this.loading = false;
          this.errorMessage = error.error.error;
          setTimeout(() => { this.errorMessage = '' }, 4000);
        }
      );
    }
  }

}
