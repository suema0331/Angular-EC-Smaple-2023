import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filter } from 'rxjs';
import { STORAGE_KEY_SHOWN_ONBOARD } from 'src/app/extra/constants';
import { LocationService } from 'src/app/service/utilities/location.service';
import { ValidationService } from 'src/app/service/utilities/validation.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/shared/services/auth.service';
import { LogService } from 'src/shared/services/log.service';
import { StorageService } from 'src/shared/services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  screenName = 'SignupComponent';
  screenId = '(none)';

  // Reactive Form Definition
  form = this.fb.group({
    form_email: [''],
    form_password: [''],
    form_confirm_password: [''],
  });

  // Instance of forms
  formEmail = this.form.get('form_email');
  formPassword = this.form.get('form_password');
  formConfirm_password = this.form.get('form_confirm_password');

  isError = false;
  errorMessage = '';

  isDisabled = true; // is Disaled for the submit button

  mailErrorMessage = '';
  passwordEmptyErrorMessage = '';
  passwordValidErrorMessage = '';
  passwordLengthErrorMessage = '';
  passwordExclusionErrorMessage = '';
  passwordMailErrorMessage = '';
  conformPasswordErrorMessage = '';
  agreementErrorMessage = '';

  isMailError = false;
  isPasswordError = false;
  isConfirmPasswordError = false;
  isAgreementError = false;
  agreementChecked = false;

  // hide password
  hide1 = true;
  hide2 = true;

  // The confirm button should not be pressed in succession.
  isSubmitted = false;

  envView = environment;
  links = this.locationService.links;

  constructor(
    private fb: FormBuilder,
    public locationService: LocationService,
    private logService: LogService,
    private storageService: StorageService,
    private authService: AuthService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    // Outputs changes in Form values.
    this.formEmail?.valueChanges.subscribe((value) => {
      this.logService.logDebug(`form_email: ${value}`);
      this.validateMailError();
      this.onDisabled();
    });
    this.formPassword?.valueChanges.subscribe((value) => {
      this.logService.logDebug(`form_password: ${value}`);
      this.validatePasswordError();
      this.onDisabled();
    });
    this.formConfirm_password?.valueChanges.subscribe((value) => {
      this.logService.logDebug(`form_confirm_password: ${value}`);
      this.validateConfirmPasswordError();
      this.onDisabled();
    });
    // Restore form data stored in storage if there are.
    // In this way, input values can be restored again when the user returns from a page transition.
    const formDraft = this.storageService.get('signup_form');
    if (formDraft) {
      this.form.setValue(JSON.parse(formDraft));
    }
    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((value) =>
        this.storageService.set('signup_form', JSON.stringify(value))
      );
  }

  formOnClickSignupHandler(): void {
    this.validateMailError();
    this.validatePasswordError();
    this.validateConfirmPasswordError();
    if (!this.agreementChecked) {
      this.isAgreementError = true;
      this.agreementErrorMessage =
        '*Your consent is required. Please check the box';
      return;
    }
    // validation
    if (
      this.isMailError ||
      this.isPasswordError ||
      this.isConfirmPasswordError ||
      this.isAgreementError
    ) {
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

    // No double submitting
    if (this.isSubmitted) {
      return;
    }
    this.isSubmitted = true;

    this.authService
      .signUp(trimmedEmail, trimmedPassword)
      .then(() => {
        this.logService.logDebug('Signup succeeded');
        this.locationService.navigateTo1_1();
        // Onboarding display flag after successful registration
        this.storageService.set(STORAGE_KEY_SHOWN_ONBOARD, 'false');
      })
      .catch((error) => {
        this.isError = true;
        this.errorMessage = 'Incorrect Email or Password';
        this.logService.logDebug('Signup failure');
        console.log(error);
        this.isSubmitted = false;
      });
  }

  onDisabled() {
    this.isDisabled =
      this.validateMailError() ||
      this.validatePasswordError() ||
      this.validateConfirmPasswordError();
  }

  navigateToTermsHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/terms.html`, '_blank', 'noreferrer');
    window.open(
      `https://www.linkedin.com/in/haruno-suematsu-b20a03235/`,
      '_blank',
      'noreferrer'
    );
  }

  navigateToPolicyHandler($event: Event): void {
    $event.preventDefault();
    // If we have production server
    // window.open(`${environment.BASE_URL}/policy.html`, '_blank', 'noreferrer');
    window.open(`https://haruno-suematsu.netlify.app/`, '_blank', 'noreferrer');
  }

  // validation mail
  validateMailError(): boolean {
    const userAccountValidation = this.validationService.validateMailError(
      String(this.form_email)
    );
    this.mailErrorMessage = userAccountValidation.message;
    this.isMailError = userAccountValidation.isError;
    return userAccountValidation.isError;
  }

  // validation password
  validatePasswordError(): boolean {
    const userAccountValidation = this.validationService.validatePasswordError(
      String(this.form_password),
      String(this.form_email)
    );
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
    const userAccountValidation =
      this.validationService.validateConfirmPassword(
        String(this.form_password),
        String(this.form_confirm_password)
      );
    this.conformPasswordErrorMessage = userAccountValidation.message;
    this.isConfirmPasswordError = userAccountValidation.isError;
    return userAccountValidation.isError;
  }

  // validation checkAgreement
  validateAgreementError(event: Event): boolean {
    const checkedValidation =
      this.validationService.validateAgreementError(event);
    this.agreementErrorMessage = checkedValidation.message;
    this.agreementChecked = checkedValidation.isChecked;
    this.isAgreementError = checkedValidation.isError;
    return checkedValidation.isError;
  }

  // Getter: form login_id
  get form_email(): string | null | undefined {
    return this.formEmail?.value;
  }

  // Getter: form password
  get form_password(): string | null | undefined {
    return this.formPassword?.value;
  }

  // Getter: form confirm_password
  get form_confirm_password(): string | null | undefined {
    return this.formConfirm_password?.value;
  }

  // Clear saved data of the forms
  clearSavedDataOfForm(): void {
    this.storageService.remove('login_form_component_form');
  }
}
