import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonHeaderComponent } from './common-header.component';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';

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
