import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent  implements OnInit {
  errorMessage!: string;
  showPassword: boolean = false;
  loading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {}

  forgetPassword() {
    this.loading = true ;
    this.errorMessage = ''; 

    if ( this.loginForm.valid ) {
      const email = this.loginForm.value.email as string; 
      this.authService.forget(email).subscribe(
        () => { 
          this.loading = false 
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.error.error;
          setTimeout(() => { this.errorMessage = '' }, 4000);
        }
      );
    }
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
