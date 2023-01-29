import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SYSTEM_STATUS_MOCK_DATA } from 'src/backend/services/test/firebase.service.mock-data';
import { CommonFooterComponent } from './common-footer.component';
import { By } from '@angular/platform-browser';

const collectionSpy = jasmine.createSpyObj({
  valueChanges: of(SYSTEM_STATUS_MOCK_DATA),
});
const afSpy = jasmine.createSpyObj('AngularFirestore', {
  collection: collectionSpy,
});

describe('CommonFooterComponent', () => {
  let component: CommonFooterComponent;
  let fixture: ComponentFixture<CommonFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonFooterComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonFooterComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
