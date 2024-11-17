import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { IToken } from '../../../core/interfaces/i-token';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'], // Corrected styleUrls
})
export class SigninComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with empty values or default values
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]], // Make username a required field
      password: ['', [Validators.required]], // Make password a required field
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      // Prevent access when logged in
      this.router.navigate(['admin']); // Navigate to dashboard if already logged in
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const signinData = {
        username: this.form.value.username,
        password: this.form.value.password,
      };

      this.authService.signIn(signinData).subscribe(
        (resp: IToken) => {
          console.log('Login Successful');
          this.authService.sessionStart(); // Mark the session as started
          this.authService.token = resp.token; // Store the token
          this.router.navigate(['admin']).then(() => {
            console.log('Navigating to Dashboard');
          });
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
