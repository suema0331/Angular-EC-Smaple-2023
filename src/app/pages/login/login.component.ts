import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {filter} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/service/utilities/location.service';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';
import { ValidationService } from 'src/app/service/utilities/validation.service';
import { AuthService } from 'src/shared/services/auth.service';
@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  screenName = 'LoginComponent';
  screenId = '(none)';

  form = this.fb.group({
    form_email: [''],
    form_password: [''],
  });

  formEmail = this.form.get('form_email');
  formPassword = this.form.get('form_password');

  isDisabled = true;
  isError = false;
  errorMessage = '';
  hide = true;
  mailErrorMessage = '';
  isMailError = false;
  passwordErrorMessage = '';
  isPasswordError = false;

  returnUrl = 'shop-top';

  constructor(
    private fb: FormBuilder,
    public locationService: LocationService,
    private logService: LogService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private validationService: ValidationService,
  ){}

  ngOnInit(): void {
    this.formEmail?.valueChanges.subscribe((value) => {
        this.logService.logDebug(`form_email: ${value}`);
      this.validateMailError()
      this.onDisabled()
    });
    this.formPassword?.valueChanges.subscribe((value) => {
      this.logService.logDebug(`form_password: ${value}`);
      this.validatePasswordError()
      this.onDisabled()
    });
    const formDraft = this.storageService.get('login_form');
    if (formDraft) {
      this.form.setValue(JSON.parse(formDraft));
    }
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid)
      )
    .subscribe(value => this.storageService.set('login_form' , JSON.stringify(value)));

    // ログイン画面に成功した時にリダイレクトする URLをクエリパラメーターから取得する。Guardから飛んできたなら元のページURL
    // The URL to redirect to when the login screen succeeds, taken from the query parameter, or the original page URL if you flew in from Guard.
    this.activatedRoute.queryParams
      .pipe(
        filter(param => param['return'])
      )
      .subscribe((params) => {
        this.returnUrl = params['return'] || '/';
      });
  }

  formOnClickLoginHandler(): void {
    this.validateMailError()
    this.validatePasswordError()
    if (!this.form_email || !this.form_password) return
    if (this.isMailError || this.isPasswordError) return

    const trimmedEmail = this.form_email.replace(/\s+/g, '');
    const trimmedPassword = this.form_password.replace(/\s+/g, '');

    this.logService.logDebug(`trimmedEmail , ${trimmedEmail}`);

    this.authService.login(trimmedEmail, trimmedPassword)
      .then((result) => {
        this.logService.logDebug('login succeeded');

        this.locationService.navigateTo(this.returnUrl);
      })
      .catch((error) => {
        this.isError = true;
        this.errorMessage = 'Incorrect Email or Password';
        this.logService.logDebug('login failure');
      }
    );
  }

  onDisabled() {
    this.isDisabled = this.validateMailError() || this.validatePasswordError()
  }

  // validation for mail
  validateMailError(): boolean {
    const userAccountValidation = this.validationService.validateMailErrorOnLogin(String(this.form_email));
    this.mailErrorMessage = userAccountValidation.message;
    this.isMailError = userAccountValidation.isError;
    return userAccountValidation.isError
  }

  // validation for password
  validatePasswordError(): boolean {
    const userAccountValidation = this.validationService.validatePasswordErrorOnLogin(String(this.form_password));
    this.passwordErrorMessage = userAccountValidation.message;
    this.isPasswordError = userAccountValidation.isError;
    return userAccountValidation.isError
  }

  get form_email(): string | null | undefined {
    return this.formEmail?.value;
  }

  get form_password(): string | null | undefined {
    return this.formPassword?.value;
  }

  clearSavedDataOfForm(): void {
    this.storageService.remove('login_form_component_form');
  }

}
