import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SYSTEM_STATUS_MOCK_DATA } from 'src/backend/services/test/firebase.service.mock-data';
import { CommonHeaderComponent } from './common-header.component';
import { By } from '@angular/platform-browser';

const collectionSpy = jasmine.createSpyObj({
  valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
});
const afSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy,
});

describe('CommonHeaderComponent', () => {
  let component: CommonHeaderComponent;
  let fixture: ComponentFixture<CommonHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonHeaderComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonHeaderComponent);
    component = fixture.componentInstance;
    component.headerTitle = 'TEST_HEADER_TITLE';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the title', () => {
    const element = fixture.debugElement.query(By.css('.header')).nativeElement;
    expect(element.textContent).toContain(`TEST_HEADER_TITLE`);
  });
});
