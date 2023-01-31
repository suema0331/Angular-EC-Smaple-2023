import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonHeaderComponent } from 'src/app/components/common-header/common-header.component';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, CommonHeaderComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule, ReactiveFormsModule, MdbFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should be title as Angular EC App 2023', () => {
  //   const element = fixture.debugElement.query(By.css('._name')).nativeElement;
  //   expect(element.textContent).toContain('Angular EC App 2023');
  // });

  // it('should be show the maintenance message', () => {
  //   const element = fixture.debugElement.query(By.css('._ttl')).nativeElement;
  //   expect(element.textContent).toContain(
  //     'This service is currently under maintenance.'
  //   );
  // });
});
