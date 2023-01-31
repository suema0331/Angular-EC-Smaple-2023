import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { CommonFooterComponent } from './common-footer.component';

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
