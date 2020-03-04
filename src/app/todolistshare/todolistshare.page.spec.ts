import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodolistsharePage } from './todolistshare.page';

describe('TodolistsharePage', () => {
  let component: TodolistsharePage;
  let fixture: ComponentFixture<TodolistsharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistsharePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodolistsharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
