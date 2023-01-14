import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {filter} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/service/utilities/location.service';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { ValidationService } from 'src/app/service/utilities/validation.service';
@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  screenName = 'LoginComponent';
  screenId = '(none)';

  // リアクティブ フォーム定義
  form = this.fb.group({
    form_email: [''],
    form_password: [''],
  });

  // form login_id のインスタンス
  formEmail = this.form.get('form_email');
  formPassword = this.form.get('form_password');

  // is Disaled for the submit button
  isDisabled = true;
  // 上部Submit時にエラーメッセージ表示
  isError = false;
  errorMessage = '';
  // hide password
  hide = true;
  // error message
  mailErrorMessage = '';
  isMailError = false;
  passwordErrorMessage = '';
  isPasswordError = false;

  returnUrl = '/';

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
    // // デバッグ用 値の変化を出力
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
    // フォームデータ保存と復元
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
        console.log(error)
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

  // Getter for form_email
  get form_email(): string | null | undefined {
    return this.formEmail?.value;
  }

  // Getter for form_password
  get form_password(): string | null | undefined {
    return this.formPassword?.value;
  }

  // formの 保存データのクリア
  clearSavedDataOfForm(): void {
    this.storageService.remove('login_form_component_form');
  }

  // フォーム保存データのクリア
  clearAllSavedData(): void {
    this.clearSavedDataOfForm();
  }

}
