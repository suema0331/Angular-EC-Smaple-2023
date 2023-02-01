import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { By } from '@angular/platform-browser';
import { afSpy } from 'src/shared/test-assets/createFireStoreSpy';
import { MaintenanceComponent } from './maintenance.component';

describe('MaintenanceComponent', () => {
  let component: MaintenanceComponent;
  let fixture: ComponentFixture<MaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceComponent],
      providers: [{ provide: AngularFirestore, useValue: afSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MaintenanceComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be title as Angular EC App 2023', () => {
    const element = fixture.debugElement.query(By.css('._name')).nativeElement;
    expect(element.textContent).toContain('Angular EC App 2023');
  });

  it('should show the maintenance message', () => {
    const element = fixture.debugElement.query(By.css('._ttl')).nativeElement;
    expect(element.textContent).toContain(
      'This service is currently under maintenance.'
    );
  });
});
