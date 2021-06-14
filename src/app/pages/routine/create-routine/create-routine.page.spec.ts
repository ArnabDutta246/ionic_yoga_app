import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateRoutinePage } from './create-routine.page';

describe('CreateRoutinePage', () => {
  let component: CreateRoutinePage;
  let fixture: ComponentFixture<CreateRoutinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoutinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoutinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
