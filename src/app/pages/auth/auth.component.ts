import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '@common/services/authenticate.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup;
  loading: false;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
  ) {
    this.form = this.createForm();
    this.authService.currentUser.subscribe(rs => {
      rs ? this.router.navigate(['dashboard']) : null;
    });
  }

  ngOnInit(): void {
  }

  createForm(): FormGroup {
    return new FormGroup({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });
  }

  get f() { return this.form.controls; }

  login(): void {
    this.authService.login(this.f.user.value, this.f.pass.value).subscribe(
      rs => {
        this.router.navigate(['/dashboard'])
      },
      err => console.log(err)
    );
  }

}
