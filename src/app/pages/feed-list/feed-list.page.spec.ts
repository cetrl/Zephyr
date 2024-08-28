import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedListPage } from './feed-list.page';

describe('FeedListPage', () => {
  let component: FeedListPage;
  let fixture: ComponentFixture<FeedListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
