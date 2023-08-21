import { Credentials, CredentialsService } from './credentials.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logger, UntilDestroy, untilDestroyed } from '@shared';
import { AuthenticationService } from './authentication.service';

import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, from, Subscription } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';

const log = new Logger('Login');

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  loginForm!: FormGroup;
  isLoading = false;
  loadingController: any;
  redirectUrl: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    this.createForm();
  }



  ngOnInit() { }

  async login2() {
    this.isLoading = true;
    this.error = '';
    const login$ = this.authenticationService.login(this.loginForm.value);
    console.log(this.loginForm.value, 'login form value');

    forkJoin([login$])
      .pipe(
        map(([response, ...rest]) => response),
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .toPromise()
      .then(
        (response: any) => {

          this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = 'Incorrect username or password';
        }
      );
  }
  CredentialsService(CredentialsService: any) {
    throw new Error('Method not implemented.');
  }
  handleStatus(response: any) {
    throw new Error('Method not implemented.');
  }

  login() {
    this.isLoading = true;
    const login$ = this.authenticationService.login(this.loginForm.value);
    console.log(this.loginForm.value);
    login$
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        }),
        untilDestroyed(this)
      )
      .subscribe(
        (credentials) => {
          console.log(credentials);
          log.debug(`${credentials.user.email} successfully logged in`);
          this.router.navigate([this.route.snapshot.queryParams.redirect || '/'], { replaceUrl: true });
        },
        (error) => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true,
    });
  }
}
