import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  faLock = faLock;
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn()) {
      if (localStorage.getItem('role') === 'admin user') {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['user']);
      }
    }
  }

  onSubmit(): void {
    // console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (result) => {
        console.log(result);
        if (result['role'] == 'admin user') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      },
      error: (error) => {
        alert('Login Failed');
      },
      complete: () => console.log('Complete'),
    });
  }
}
