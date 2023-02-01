import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbStepperModule } from 'mdb-angular-ui-kit/stepper';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { ShopGuideComponent } from './shop-guide.component';

const testShopGuideStep = [
  {
    name: 'STEP1',
    title: 'Enjoy a large variety of products!',
    img: './assets/product/master/21.jpg',
    message:
      'We also sell easy-to-cook sets and members-only sale products, only available through online!',
    btn_name: 'Next',
  },
];

describe('ShopGuideComponent', () => {
  let component: ShopGuideComponent;
  let fixture: ComponentFixture<ShopGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopGuideComponent],
      providers: [
        { provide: AngularFirestore, useValue: afSpy },
        { provide: MdbModalRef<ShopGuideComponent>, useValue: {} },
      ],
      imports: [MdbStepperModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopGuideComponent);
    component = fixture.componentInstance;
    component.steps = testShopGuideStep;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be modal title as STEP1', () => {
    const element = fixture.debugElement.query(
      By.css('.modal-header .modal-title')
    ).nativeElement;
    expect(element.textContent).toBe(testShopGuideStep[0].name);
  });

  it('should show the STEP title', () => {
    const element = fixture.debugElement.query(
      By.css('.modal-body ._title')
    ).nativeElement;
    expect(element.textContent).toBe(testShopGuideStep[0].title);
  });

  it('should show the STEP image', () => {
    const element = fixture.debugElement.query(By.css('.modal-body ._img img'));
    expect(element.properties['src']).toBe(testShopGuideStep[0].img);
  });

  it('should show the STEP title', () => {
    const element = fixture.debugElement.query(
      By.css('.modal-body ._message')
    ).nativeElement;
    expect(element.textContent).toBe(testShopGuideStep[0].message);
  });

  it('should show the stepper btn', () => {
    const element = fixture.debugElement.query(
      By.css('.stepper-btn button')
    ).nativeElement;
    expect(element.textContent).toContain(testShopGuideStep[0].btn_name);
  });
});
