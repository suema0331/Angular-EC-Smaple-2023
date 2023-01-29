import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LocationService } from 'src/app/service/utilities/location.service';
import { SYSTEM_STATUS_MOCK_DATA } from 'src/backend/services/test/firebase.service.mock-data';
import { MypageComponent } from './mypage.component';

const collectionSpy = jasmine.createSpyObj({
  valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
});
const afSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy,
});

describe('MypageComponent', () => {
  let component: MypageComponent;
  let fixture: ComponentFixture<MypageComponent>;

  const testUser = {
    uid: '0WUrpKqKcUO68Xp2Aj5CBa0WxtW2',
    emailVerified: false,
    displayName: 'testUser',
    photoURL: 'thttps://api.multiavatar.com/116.png',
  } as User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MypageComponent],
      providers: [
        LocationService,
        { provide: AngularFirestore, useValue: afSpy },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MypageComponent);
    component = fixture.componentInstance;

    component.currentUser = testUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as My Page', () => {
    const element = fixture.nativeElement.querySelector('div._ttl');
    expect(element.textContent).toBe('My Page');
  });

  it('should show the user information', () => {
    const logoutEl = fixture.debugElement.query(
      By.css('._button-area')
    ).nativeElement;
    expect(logoutEl.textContent).toBe('logout');
    const nameEl = fixture.debugElement.query(
      By.css('.account-area ._right ._name ._value')
    ).nativeElement;
    expect(nameEl.textContent).toBe(testUser.displayName);

    const emailVerifiedEl = fixture.debugElement.query(
      By.css('.account-area ._right ._info ._value')
    ).nativeElement;
    expect(emailVerifiedEl.textContent).toBe(String(testUser.emailVerified));
  });
});
