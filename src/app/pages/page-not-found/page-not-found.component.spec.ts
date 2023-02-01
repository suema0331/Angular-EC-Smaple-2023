import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { PageNotFoundComponent } from './page-not-found.component';
import { By } from '@angular/platform-browser';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the message of 404', () => {
    const element = fixture.debugElement.query(
      By.css('._message')
    ).nativeElement;

    expect(element.textContent).toBe(
      'The page you were looking for could not be found.'
    );
  });

  it('should show the note for 404 page', () => {
    const element = fixture.debugElement.query(By.css('._note')).nativeElement;

    expect(element.textContent).toBe(
      ' The address you entered may be incorrect or the page may have moved. '
    );
  });

  it('should show the button to back to the shop top page', () => {
    const element = fixture.debugElement.query(
      By.css('.btn_group')
    ).nativeElement;

    expect(element.textContent).toContain('Back to Shop Top Page');
  });
});
