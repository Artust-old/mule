import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '@common/services/authenticate.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  protected unsubscribe: Subject<void> = new Subject<void>();

  form: FormGroup;
  loading = false;

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

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  createForm(): FormGroup {
    return new FormGroup({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });
  }

  get f() { return this.form.controls; }

  login(): void {
    this.loading = true;
    this.authService.login(this.f.user.value, this.f.pass.value).pipe(takeUntil(this.unsubscribe))
      .subscribe(
        _ => {
          this.router.navigate(['/dashboard']);
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
        }
      );
  }

}
