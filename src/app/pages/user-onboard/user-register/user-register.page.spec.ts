import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserRegisterPage } from './user-register.page';

describe('UserRegisterPage', () => {
  let component: UserRegisterPage;
  let fixture: ComponentFixture<UserRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
