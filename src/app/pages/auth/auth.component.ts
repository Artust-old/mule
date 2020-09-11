import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  ) {
    this.form = this.createForm();
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

  showForm(): void {
    console.log(this.f.user.value);
    console.log(this.f.pass.value);
  }

  login(): void {
    this.authService.login(this.f.user.value, this.f.pass.value);
  }

}
