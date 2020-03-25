import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { addTodolistPage } from './addtodolist.page';


describe('addTodolistPage', () => {
  let component: addTodolistPage;
  let fixture: ComponentFixture<addTodolistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ addTodolistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(addTodolistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
