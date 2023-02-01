import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { SignupComponent } from './signup.component';

@Component({
  selector: 'app-common-header',
  template: '<div class="header">{{ headerTitle }}</div>',
})
class CommonHeaderComponent {
  @Input() headerTitle = 'Log In';
}
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let inputEmailEl: HTMLInputElement;
  let inputPasswordEl: HTMLInputElement;
  let inputConfirmPasswordEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent, CommonHeaderComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule, ReactiveFormsModule, MdbFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputEmailEl = fixture.debugElement.query(By.css('#form_email'))
      .nativeElement as HTMLInputElement;
    inputPasswordEl = fixture.debugElement.query(By.css('#form_password'))
      .nativeElement as HTMLInputElement;
    inputConfirmPasswordEl = fixture.debugElement.query(
      By.css('#form_confirm_password')
    ).nativeElement as HTMLInputElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as Register', () => {
    const element = fixture.debugElement.query(
      By.css('app-common-header .header')
    ).nativeElement;
    expect(element.textContent).toBe('Register');
  });

  /**
   * CASE 1 - 1
   * If both Email and Password meet the requirements
   * From HTMLInputElement(DOM) to ReactiveForms(form)
   */
  it('should update the from values and have no error', () => {
    const testUser = {
      email: 'test@test.com',
      password: 'Test1234!!!',
      confirmPassword: 'Test1234!!!',
    };
    // Put values in the input element and fire the input event.
    inputEmailEl.value = testUser.email;
    inputPasswordEl.value = testUser.password;
    inputConfirmPasswordEl.value = testUser.confirmPassword;

    inputEmailEl.dispatchEvent(new Event('input'));
    inputPasswordEl.dispatchEvent(new Event('input'));
    inputConfirmPasswordEl.dispatchEvent(new Event('input'));

    // Check to see if the form has been assigned a value.
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);
    expect(component.form_confirm_password).toEqual(testUser.confirmPassword);

    console.log('🌟component.form_password');
    console.log(component.form_password);

    // Confirmation that there are no validation errors.
    expect(component.isMailError).toBeFalse();
    expect(component.isPasswordError).toBeFalse();
    expect(component.isConfirmPasswordError).toBeFalse();
  });

  /**
   * CASE 1 - 2
   * If both Email and Password meet the requirements
   * From ReactiveForms(form) to HTMLInputElement(DOM)
   */
  it('should update the input values and have no error', () => {
    const testUser = {
      email: 'test@test.com',
      password: 'Test1234!!!',
      confirmPassword: 'Test1234!!!',
    };
    // Set values in the form setter
    component.form.controls['form_email'].setValue(testUser.email);
    component.form.controls['form_password'].setValue(testUser.password);
    component.form.controls['form_confirm_password'].setValue(
      testUser.confirmPassword
    );
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);
    expect(component.form_confirm_password).toEqual(testUser.confirmPassword);

    // Check that the value is reflected in HTMLInputElement
    expect(inputEmailEl.value).toEqual(testUser.email);
    expect(inputPasswordEl.value).toEqual(testUser.password);
    expect(inputConfirmPasswordEl.value).toEqual(testUser.confirmPassword);

    //Verify that there are no errors
    expect(component.validateMailError()).toBeFalse();
    expect(component.validatePasswordError()).toBeFalse();
    expect(component.validateConfirmPasswordError()).toBeFalse();
  });

  /**
   * CASE 2 - 1
   * If both Email and Password don't meet the requirements
   * From HTMLInputElement(DOM) to ReactiveForms(form)
   */
  it('should update the from values and have errors', () => {
    const testUser = {
      email: '',
      password: '',
      confirmPassword: 'testTest1234!',
    };
    // Put values in the input element and fire the input event,
    inputEmailEl.value = testUser.email;
    inputPasswordEl.value = testUser.password;
    inputConfirmPasswordEl.value = testUser.confirmPassword;
    inputEmailEl.dispatchEvent(new Event('input'));
    inputPasswordEl.dispatchEvent(new Event('input'));
    inputConfirmPasswordEl.dispatchEvent(new Event('input'));

    // Check to see if the form has been assigned the values.
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);
    expect(component.form_confirm_password).toEqual(testUser.confirmPassword);

    // Comfirm validation error messages.
    expect(component.isMailError).toBeTrue();
    expect(component.isPasswordError).toBeTrue();
    expect(component.isConfirmPasswordError).toBeTrue();
    expect(component.mailErrorMessage).toBe('Please enter your email address.');
    expect(component.passwordEmptyErrorMessage).toBe(
      'Please enter a password.'
    );
    expect(component.conformPasswordErrorMessage).toBe(
      'Password does not match.'
    );
  });

  /**
   * CASE 2 - 2
   * If both Email and Password don't meet the requirements
   * From ReactiveForms(form) to HTMLInputElement(DOM)
   */
  it('should update the from values and have errors', () => {
    const testUser = {
      email: '',
      password: '',
      confirmPassword: 'Test1234!!!',
    };
    // Set values in the form setter.
    component.form.controls['form_email'].setValue(testUser.email);
    component.form.controls['form_password'].setValue(testUser.password);
    component.form.controls['form_confirm_password'].setValue(
      testUser.confirmPassword
    );
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);
    expect(component.form_confirm_password).toEqual(testUser.confirmPassword);

    // Check to see if the form has been assigned a value.
    expect(inputEmailEl.value).toEqual(testUser.email);
    expect(inputPasswordEl.value).toEqual(testUser.password);
    expect(inputConfirmPasswordEl.value).toEqual(testUser.confirmPassword);

    // Comfirm validation error messages.
    expect(component.validateMailError()).toBeTrue();
    expect(component.validatePasswordError()).toBeTrue();
    expect(component.validateConfirmPasswordError()).toBeTrue();
    expect(component.mailErrorMessage).toBe('Please enter your email address.');
    expect(component.passwordEmptyErrorMessage).toBe(
      'Please enter a password.'
    );
    expect(component.conformPasswordErrorMessage).toBe(
      'Password does not match.'
    );
  });
});
