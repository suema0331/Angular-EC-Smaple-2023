import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { LoginComponent } from './login.component';

@Component({
  selector: 'app-common-header',
  template: '<div class="header">{{ headerTitle }}</div>',
})
class CommonHeaderComponent {
  @Input() headerTitle = 'Log In';
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let inputEmailEl: HTMLInputElement;
  let inputPasswordEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, CommonHeaderComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule, ReactiveFormsModule, MdbFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    inputEmailEl = fixture.debugElement.query(By.css('#form_email'))
      .nativeElement as HTMLInputElement;
    inputPasswordEl = fixture.debugElement.query(By.css('#form_password'))
      .nativeElement as HTMLInputElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as Log In', () => {
    const element = fixture.debugElement.query(
      By.css('app-common-header .header')
    ).nativeElement;

    // Child component instance also can be selected from debugElement with `By.directive`.
    // const child = fixture.debugElement.query(
    //   By.directive(CommonHeaderComponent)
    // ).nativeElement;
    expect(element.textContent).toBe('Log In');
  });

  /**
   * CASE 1 - 1
   * If both Email and Password meet the requirements
   * From HTMLInputElement(DOM) to ReactiveForms(form)
   */
  it('user should update from form changes', () => {
    const testUser = {
      email: 'test@test.com',
      password: 'aaaaaaaaaaa',
    };
    // Put values in the input element and fire the input event.
    inputEmailEl.value = testUser.email;
    inputPasswordEl.value = testUser.password;
    inputEmailEl.dispatchEvent(new Event('input'));
    inputPasswordEl.dispatchEvent(new Event('input'));

    // Check to see if the form has been assigned a value.
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);

    // Confirmation that there are no validation errors.
    expect(component.isMailError).toBeFalsy();
    expect(component.isPasswordError).toBeFalsy();
  });

  /**
   * CASE 1 - 2
   * If both Email and Password meet the requirements
   * From ReactiveForms(form) to HTMLInputElement(DOM)
   */
  it('user should update from form changes', () => {
    const testUser = {
      email: 'test@test.com',
      password: 'aaaaaaaaaaa',
    };
    // Set values in the form setter
    component.form.controls['form_email'].setValue(testUser.email);
    component.form.controls['form_password'].setValue(testUser.password);
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);

    // Check that the value is reflected in HTMLInputElement
    expect(inputEmailEl.value).toEqual(testUser.email);
    expect(inputPasswordEl.value).toEqual(testUser.password);

    //Verify that there are no errors
    expect(component.validateMailError()).toBeFalsy();
    expect(component.validatePasswordError()).toBeFalsy();
  });

  /**
   * CASE 2 - 1
   * If both Email and Password don't meet the requirements
   * From HTMLInputElement(DOM) to ReactiveForms(form)
   */
  it('user should update from form changes', () => {
    const testUser = {
      email: '',
      password: '',
    };
    // Put values in the input element and fire the input event,
    inputEmailEl.value = testUser.email;
    inputPasswordEl.value = testUser.password;
    inputEmailEl.dispatchEvent(new Event('input'));
    inputPasswordEl.dispatchEvent(new Event('input'));

    // Check to see if the form has been assigned the values.
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);

    // Comfirm validation error messages.
    expect(component.isMailError).toBeTruthy();
    expect(component.isPasswordError).toBeTruthy();
    expect(component.mailErrorMessage).toBe('Please enter a email address.');
    expect(component.passwordErrorMessage).toBe('Please enter a password.');
  });

  /**
   * CASE 2 - 2
   * If both Email and Password don't meet the requirements
   * From ReactiveForms(form) to HTMLInputElement(DOM)
   */
  it('user should update from form changes', () => {
    const testUser = {
      email: '',
      password: '',
    };
    // Set values in the form setter.
    component.form.controls['form_email'].setValue(testUser.email);
    component.form.controls['form_password'].setValue(testUser.password);
    expect(component.form_email).toEqual(testUser.email);
    expect(component.form_password).toEqual(testUser.password);

    // Check to see if the form has been assigned a value.
    expect(inputEmailEl.value).toEqual(testUser.email);
    expect(inputPasswordEl.value).toEqual(testUser.password);

    // Comfirm validation error messages.
    expect(component.validateMailError()).toBeTruthy();
    expect(component.validatePasswordError()).toBeTruthy();
    expect(component.mailErrorMessage).toBe('Please enter a email address.');
    expect(component.passwordErrorMessage).toBe('Please enter a password.');
  });
});
