import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenPlayerBasicsComponent } from './screen-player-basics.component';

describe('ScreenPlayerBasicsComponent', () => {
  let component: ScreenPlayerBasicsComponent;
  let fixture: ComponentFixture<ScreenPlayerBasicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenPlayerBasicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPlayerBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
