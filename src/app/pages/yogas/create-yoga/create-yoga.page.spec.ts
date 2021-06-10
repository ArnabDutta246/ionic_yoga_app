import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateYogaPage } from './create-yoga.page';

describe('CreateYogaPage', () => {
  let component: CreateYogaPage;
  let fixture: ComponentFixture<CreateYogaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateYogaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateYogaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
