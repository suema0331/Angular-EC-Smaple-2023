import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/service/utilities/location.service';
import { environment } from 'src/environments/environment';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';
import { AuthService } from 'src/app/service/auth.service';
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

  // エラーメッセージ表示
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

  customerCode = '';

  @ViewChild('errorMessageContent') errorMessageContent: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    public locationService: LocationService,
    private logService: LogService,
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    // private validationService: ValidationService,
    // private notificationService: NotificationService
  ){}

  ngOnInit(): void {
    // デバッグ用 値の変化を出力
    if (!environment.production){
      this.formEmail?.valueChanges.subscribe((value) => {this.logService.logDebug(`form_email: ${value}`); });
      this.formPassword?.valueChanges.subscribe((value) => {this.logService.logDebug(`form_password: ${value}`); });
    }
    // フォームデータ保存と復元
    const formDraft = this.storageService.get('login_form_component_form');
    if (formDraft) {
      this.form.setValue(JSON.parse(formDraft));
    }
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid)
      )
    .subscribe(value => this.storageService.set('login_form_component_form' , JSON.stringify(value)));
    this.logService.logDebug(`${this.screenId}:${this.screenName} が初期化されました。` );

    // ログイン画面に成功した時にリダイレクトする URLをクエリパラメーターから取得する。Guardから飛んできたなら元のページURL
    this.activatedRoute.queryParams
      .pipe(
        filter(param => param['return'])
      )
      .subscribe((params) => {
        this.returnUrl = params['return'] || '/';
      });

  }

  formOnClickLoginHandler(): void {
    console.log(this.form_email)
    console.log(this.form_password)

    if (!this.form_email || !this.form_password) return
    const trimmedEmail = this.form_email.replace(/\s+/g, '');
    const trimmedPassword = this.form_password.replace(/\s+/g, '');
    this.logService.logDebug(`trimmedEmail , ${trimmedEmail}`);

    this.authService.login(trimmedEmail, trimmedPassword)
      .then(() => {
        this.logService.logDebug('login succeeded');
        this.locationService.navigateTo(this.returnUrl);
      })
      .catch((error) => {
        alert(error)
        this.isError = true;
        this.errorMessage = 'ログインIDまたはパスワードが正しくありません';
      });
    // const tokenInfoPromise = this.appService.login( trimmedEmail, trimmedPassword);
    // tokenInfoPromise.then((tokenInfo ) => {

    //   if (tokenInfo.access_token !== undefined) {
    //     this.logService.logDebug('logged in succeeded');

    //     this.locationService.navigateTo(this.returnUrl);
    //   } else if (tokenInfo.status === 4){
    //     this.logService.logDebug('logged in failed due to lock');
    //     this.isError = true;
    //     this.errorMessage = '時間をおいて再度お試しいただくか<br>パスワードをリセットしてください';
    //   } else {
    //     this.logService.logDebug('logged in failed');
    //     this.isError = true;
    //     this.errorMessage = 'ログインIDまたはパスワードが正しくありません';
    //   }
    // }).catch((err) => {
    //     this.logService.logDebug('unknown error');
    //     this.isError = true;
    //     this.errorMessage = '時間をおいて再度お試しください';
    //     throwError(err);
    // });
  }

  // createMessageElement(message: string): void {
  //   if (this.errorMessageContent && this.errorMessageContent.nativeElement) {
  //     this.errorMessageContent.nativeElement.innerHTML = message;
  //   }
  // }

  // validation mail
  validateMailError(): void {
    // const userAccountValidation = this.validationService.validateMailErrorOnLogin(this.form_email);
    // this.mailErrorMessage = userAccountValidation.message;
    // this.isMailError = userAccountValidation.isError;
  }

  // validation password
  validatePasswordError(): void {
    // const userAccountValidation = this.validationService.validatePasswordErrorOnLogin(this.form_password);
    // this.passwordErrorMessage = userAccountValidation.message;
    // this.isPasswordError = userAccountValidation.isError;
  }

  // form login_id の Getter
  get form_email(): string | null | undefined {
    return this.formEmail?.value;
  }

  // form password の Getter
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
