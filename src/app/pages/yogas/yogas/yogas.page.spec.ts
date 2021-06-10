import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { YogasPage } from './yogas.page';

describe('YogasPage', () => {
  let component: YogasPage;
  let fixture: ComponentFixture<YogasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YogasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(YogasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
