import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateRoomPage } from './create-room.page';

describe('CreateRoomPage', () => {
  let component: CreateRoomPage;
  let fixture: ComponentFixture<CreateRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
