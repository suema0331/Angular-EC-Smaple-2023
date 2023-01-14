import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { LocationService } from 'src/app/service/utilities/location.service';
import { ValidationService } from 'src/app/service/utilities/validation.service';
import { environment } from 'src/environments/environment';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  screenName = 'SignupComponent';
  screenId = '(none)';

  // リアクティブ フォーム定義
  form = this.fb.group({
    form_email: [''],
    form_password: [''],
    form_confirm_password: [''],
  });

  // form login_id のインスタンス
  formEmail = this.form.get('form_email');
  formPassword = this.form.get('form_password');
  formConfirm_password = this.form.get('form_confirm_password');

  // 上部Submit時にエラーメッセージ表示
  isError = false;
  errorMessage = '';
  // is Disaled for the submit button
  isDisabled = true;
  // error message
  mailErrorMessage = '';
  // password error message
  passwordEmptyErrorMessage = '';
  passwordValidErrorMessage = '';
  passwordLengthErrorMessage = '';
  passwordExclusionErrorMessage = '';
  passwordMailErrorMessage = '';

  conformPasswordErrorMessage = '';
  agreementErrorMessage = '';

  isMailError = false;
  // isPasswordLengthError = false;
  isPasswordError = false;
  // isPasswordExclusionError = false;
  isConfirmPasswordError = false;
  isAgreementError = false;
  agreementChecked = false; // submit時のバリデーションのため

  // hide password
  hide1 = true;
  hide2 = true;

  // 確定は一度しか押せない
  isSubmitted = false;

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
    // Form 値の変化を出力
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
    this.formConfirm_password?.valueChanges.subscribe((value) => {
      this.logService.logDebug(`form_confirm_password: ${value}`);
      this.validateConfirmPasswordError()
      this.onDisabled()
    });
    // フォームデータ保存と復元
    const formDraft = this.storageService.get('signup_form');
    if (formDraft) {
      this.form.setValue(JSON.parse(formDraft));
    }
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid)
      )
    .subscribe(value => this.storageService.set('signup_form' , JSON.stringify(value)));
  }

  formOnClickSignupHandler(): void {
    // cacheが残っている可能性があるので、再度validationをかける
    this.validateMailError()
    this.validatePasswordError()
    this.validateConfirmPasswordError()
    // 初期状態のまま、先に進めないようにする
    if (!this.agreementChecked) {
      this.isAgreementError = true;
      this.agreementErrorMessage = '*Your consent is required. Please check the box';
      return;
    }
    // validation
    if (this.isMailError || this.isPasswordError ||
      this.isConfirmPasswordError || this.isAgreementError) {
      alert('Please confirm your input');
      return;
    }
    // validation for form_email/form_password
    if (!this.form_email || !this.form_password) {
      return;
    }
    const trimmedEmail = this.form_email.replace(/\s+/g, '');
    const trimmedPassword = this.form_password.replace(/\s+/g, '');

    this.logService.logDebug(`trimmedEmail , ${trimmedEmail}`);

    // 二重サブミット禁止
    if (this.isSubmitted){
      return;
    }
    this.isSubmitted = true;

    this.authService.signUp(trimmedEmail, trimmedPassword)
      .then((result) => {
        this.logService.logDebug('Signup succeeded');
        this.locationService.navigateTo1_1();
      })
      .catch((error) => {
        this.isError = true;
        this.errorMessage = 'Incorrect Email or Password';
        this.logService.logDebug('Signup failure');
        console.log(error)
        this.isSubmitted = false;
      })
  }

  onDisabled() {
    this.isDisabled = this.validateMailError() || this.validatePasswordError() || this.validateConfirmPasswordError()
  }

  navigateToTermsHandler(): void{
    if (environment.production){
      window.open(`https://www.linkedin.com/in/haruno-suematsu-b20a03235/`, '_blank');
    } else {
      window.open(`https://www.linkedin.com/in/haruno-suematsu-b20a03235/`, '_blank');
    }
  }

  navigateToPolicyHandler(): void{
    if (environment.production){
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    } else {
      window.open(`https://haruno-suematsu.netlify.app/`, '_blank');
    }
  }

  // validation mail
  validateMailError(): boolean {
    const userAccountValidation = this.validationService.validateMailError(String(this.form_email));
    this.mailErrorMessage = userAccountValidation.message;
    this.isMailError = userAccountValidation.isError;
    return userAccountValidation.isError;
  }

  // validation password
  validatePasswordError(): boolean {
    const userAccountValidation = this.validationService.validatePasswordError(String(this.form_password), String(this.form_email));
    this.passwordEmptyErrorMessage = userAccountValidation.messageEmpty;
    this.passwordValidErrorMessage = userAccountValidation.messageValid;
    this.passwordLengthErrorMessage = userAccountValidation.messageLength;
    this.passwordExclusionErrorMessage = userAccountValidation.messageExclusion;
    this.passwordMailErrorMessage = userAccountValidation.messageMail;
    this.isPasswordError = userAccountValidation.isError;
    return userAccountValidation.isError;
  }
  // validation confirm password

  validateConfirmPasswordError(): boolean {
    const userAccountValidation = this.validationService.validateConfirmPassword(String(this.form_password), String(this.form_confirm_password));
    this.conformPasswordErrorMessage = userAccountValidation.message;
    this.isConfirmPasswordError = userAccountValidation.isError;
    return userAccountValidation.isError;
  }

  // validation checkAgreement
  validateAgreementError(event: any): boolean {
    const checkedValidation = this.validationService.validateAgreementError(event);
    this.agreementErrorMessage = checkedValidation.message;
    this.agreementChecked = checkedValidation.isChecked;
    this.isAgreementError = checkedValidation.isError;
    return checkedValidation.isError;
  }

  // form login_id の Getter
  get form_email(): string | null | undefined {
    return this.formEmail?.value;
  }

  // form password の Getter
  get form_password(): string | null | undefined {
    return this.formPassword?.value;
  }

  // form confirm_password の Getter
  get form_confirm_password(): string | null | undefined {
    return this.formConfirm_password?.value;
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
