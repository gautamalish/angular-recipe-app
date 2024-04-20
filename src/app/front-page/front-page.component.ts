import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HeaderCompComponent } from '../header-comp/header-comp.component';
// import { BodyComponent } from './body/body.component';
import { MatIconModule } from '@angular/material/icon';
// import {AngularFireModule} from '@angular/fire';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [
    HeaderCompComponent,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css',
})
export class FrontPageComponent implements OnInit {
  searchText: string = '';
  error: string = '';
  constructor(private route: Router) {}

  noRecipesFound: boolean = false;
  // creating detailsObj of class RecipeDetails
  detailsObj: RecipeDetails = new RecipeDetails();
  // creating a recipelist array
  recipeList: RecipeDetails[] = [];
  filteredRecipeList: RecipeDetails[] = [];
  ngOnInit(): void {
    // getting the localRecipe item from localstorage
    const localData = localStorage.getItem('localRecipe');
    // storing the data in recipeList if it isn't empty
    if (localData != null) {
      this.recipeList = JSON.parse(localData);
    }
  }
  @ViewChild('close') closeModal: ElementRef | undefined;
  @ViewChild('exampleModal') exampleModal: ElementRef | undefined;
  // Function to call when Add recipe is clicked
  changeModalDisplay() {
    // if this.exampleModal exists then set it to block to display
    if (this.exampleModal) {
      this.exampleModal.nativeElement.style.display = 'block';
    }
  }
  // Function to call when search text is entered
  onSearchTextEntered(value: string) {
    this.searchText = value;
    // looks in the recipeList and tries to find the recipe with the search text in title
    this.noRecipesFound = this.recipeList.every(
      (item) =>
        !item.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  // When modal close is clicked
  onCloseClick() {
    this.error = '';
    // resetting the data
    this.detailsObj = new RecipeDetails();
    // changing the display of modal to none
    if (this.exampleModal) {
      this.exampleModal.nativeElement.style.display = 'none';
    }
  }
  // called when edit button is clicked
  onEdit(item: RecipeDetails) {
    this.detailsObj = item;
    this.changeModalDisplay();
  }
  // called when Add recipe is clicked
  addRecipe() {
    // validation to check if any field is empty
    if (
      !this.detailsObj.imageUrl ||
      !this.detailsObj.title ||
      !this.detailsObj.description ||
      !this.detailsObj.ingredients ||
      !this.detailsObj.instructions ||
      !this.detailsObj.nutrition
    ) {
      this.error = 'Please fill up all the fields';
      return;
    }
    this.error = '';
    const isLocalPresent = localStorage.getItem('localRecipe');
    // if condition to check if localRecipe is present in the local storage
    if (isLocalPresent != null) {
      this.error = '';
      const oldArray = JSON.parse(isLocalPresent);
      // getting the max id using array reduce function
      const maxId = oldArray.reduce(
        (max: any, currentRecipe: any) => Math.max(max, currentRecipe.id),
        0
      );
      this.detailsObj.id = maxId + 1;
      // pushing the this.detailsObj in oldArray
      oldArray.push(this.detailsObj);
      this.recipeList = oldArray;
      // setting the localStorage to oldArray
      localStorage.setItem('localRecipe', JSON.stringify(oldArray));
    }
    // runs if no data is present in the localStorage
    else {
      this.error = '';
      const newArr = [];
      // pushing the data to newArray
      newArr.push(this.detailsObj);
      // setting the new recipe id to 1
      this.detailsObj.id = 1;
      // setting the recipeList to newArr
      this.recipeList = newArr;
      // setting the localStorage to newArr
      localStorage.setItem('localRecipe', JSON.stringify(newArr));
    }
    // closing the modal when adding is complete
    this.onCloseClick();
  }
  // when delete is clicked
  onDelete(item: RecipeDetails) {
    const isDelete = confirm('Are you sure you want to delete the recipe?');
    // checking if okay was clicked
    if (isDelete) {
      // finding the currentRecord
      const currentRecord = this.recipeList.findIndex((m) => m.id === item.id);
      // deleting the currentRecord using splice
      this.recipeList.splice(currentRecord, 1);
      // pushing th this.recipeList to localStorage
      localStorage.setItem('localRecipe', JSON.stringify(this.recipeList));
    }
  }
  // when updateRecipe is clicked
  updateRecipe() {
    // finding the recipe which mathced the id
    const currentRecord = this.recipeList.find(
      (m) => m.id === this.detailsObj.id
    );
    // runs if currentRecord is not undefined
    if (currentRecord != undefined) {
      // setting the currentRecord's data to detailsOjs's
      currentRecord.imageUrl = this.detailsObj.imageUrl;
      currentRecord.title = this.detailsObj.title;
      currentRecord.description = this.detailsObj.description;
      currentRecord.ingredients = this.detailsObj.ingredients;
      currentRecord.instructions = this.detailsObj.instructions;
      currentRecord.nutrition = this.detailsObj.nutrition;
    }
    // setting the localStorage to this.recipeList
    localStorage.setItem('localRecipe', JSON.stringify(this.recipeList));
    // closing the modal
    this.onCloseClick();
  }
}

// creating a class  RecipeDetails with the variables that holds the recipe data
export class RecipeDetails {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  nutrition: string;

  constructor() {
    this.imageUrl = '';
    this.title = '';
    this.description = '';
    this.ingredients = '';
    this.instructions = '';
    this.nutrition = '';
    this.id = 0;
  }
}
