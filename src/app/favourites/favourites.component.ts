import { Component, Input, OnInit, inject } from '@angular/core';
import {
  Route,
  RouterLink,
  RouterModule,
  ActivatedRoute,
} from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeDetails } from '../front-page/front-page.component';
@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css',
})
export class FavouritesComponent implements OnInit {
  favouritesRecipeList: any;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.favouritesRecipeList = Object.values(history.state).filter(
      (item) => typeof item === 'object'
    );
  }
  onDelete(item: any) {
    const isDelete = confirm('Are you sure you want to delete the recipe?');
    if (isDelete) {
      // finding the currentRecord
      const currentRecord = this.favouritesRecipeList.findIndex(
        (m: any) => m.id === item.id
      );
      // deleting the currentRecord using splice
      this.favouritesRecipeList.splice(currentRecord, 1);
      // pushing th this.recipeList to localStorage
      localStorage.setItem(
        'favouritesRecipe',
        JSON.stringify(this.favouritesRecipeList)
      );
    }
  }
}
