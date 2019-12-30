import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailModeratorComponent } from './book-detail-moderator.component';

describe('BookDetailModeratorComponent', () => {
  let component: BookDetailModeratorComponent;
  let fixture: ComponentFixture<BookDetailModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailModeratorComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
