import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodolistsPage } from './todolists.page';

describe('TodolistsPage', () => {
  let component: TodolistsPage;
  let fixture: ComponentFixture<TodolistsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodolistsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodolistsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
