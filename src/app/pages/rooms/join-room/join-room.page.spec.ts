import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinRoomPage } from './join-room.page';

describe('JoinRoomPage', () => {
  let component: JoinRoomPage;
  let fixture: ComponentFixture<JoinRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
