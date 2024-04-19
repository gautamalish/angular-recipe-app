import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRecipeComponent } from './detailed-recipe.component';

describe('DetailedRecipeComponent', () => {
  let component: DetailedRecipeComponent;
  let fixture: ComponentFixture<DetailedRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
