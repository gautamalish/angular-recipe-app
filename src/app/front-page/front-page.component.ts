
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HeaderCompComponent } from '../header-comp/header-comp.component';
// import { BodyComponent } from './body/body.component';
import { MatIconModule } from '@angular/material/icon';
// import {AngularFireModule} from '@angular/fire';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route,RouterLink,Router } from '@angular/router';
@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [
    HeaderCompComponent,
    MatIconModule,
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css'
})
export class FrontPageComponent implements OnInit{
  searchText: string = '';
  error:string="";
  constructor(private route:Router){
    
  }
  
  noRecipesFound: boolean = false;
  detailsObj: RecipeDetails = new RecipeDetails();
  recipeList: RecipeDetails[] = [];
  filteredRecipeList: RecipeDetails[] = [];
  ngOnInit(): void {
    const localData = localStorage.getItem('localRecipe');
    if (localData != null) {
      this.recipeList = JSON.parse(localData);
    }
  }
  @ViewChild('close') closeModal: ElementRef | undefined;
  @ViewChild('exampleModal') exampleModal: ElementRef | undefined;
  changeModalDisplay() {
    if (this.exampleModal) {
      this.exampleModal.nativeElement.style.display = 'block';
      console.log(this.recipeList)
    }
  }
  onSearchTextEntered(value: string) {
    this.searchText = value;
    this.noRecipesFound = this.recipeList.every(
      (item) =>
        !item.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  onCloseClick() {
    this.error=""
    this.detailsObj = new RecipeDetails();
    if (this.exampleModal) {
      this.exampleModal.nativeElement.style.display = 'none';
    }
  }
  onEdit(item: RecipeDetails) {
    console.log(item.id);
    this.detailsObj = item;
    this.changeModalDisplay();
  }

  addRecipe() {
    if(!this.detailsObj.imageUrl || !this.detailsObj.title || !this.detailsObj.description || !this.detailsObj.ingredients || !this.detailsObj.instructions || !this.detailsObj.nutrition){
      this.error="Please fill up all the fields";
      return;
    }
    this.error=""
    const isLocalPresent = localStorage.getItem('localRecipe');
    if (isLocalPresent != null) {
      this.error=""
      const oldArray = JSON.parse(isLocalPresent);
      const maxId = oldArray.reduce((max:any, currentRecipe:any) => Math.max(max, currentRecipe.id), 0);
      this.detailsObj.id=maxId+1
      oldArray.push(this.detailsObj);
      this.recipeList = oldArray;
      localStorage.setItem('localRecipe', JSON.stringify(oldArray));
    } else {
      this.error=""
      const newArr = [];
      newArr.push(this.detailsObj);
      this.detailsObj.id = 1;
      this.recipeList = newArr;
      localStorage.setItem('localRecipe', JSON.stringify(newArr));
    }
    this.onCloseClick();
  }
  onDelete(item: RecipeDetails) {
    const isDelete = confirm('Are you sure you want to delete the recipe?');
    if (isDelete) {
      const currentRecord = this.recipeList.findIndex((m) => m.id === item.id);
      this.recipeList.splice(currentRecord, 1);
      localStorage.setItem('localRecipe', JSON.stringify(this.recipeList));
    }
  }
  navigateToDetails(id:number){
    this.route.navigate(['/detailed-recipe',id])
  }
  updateRecipe() {
    const currentRecord = this.recipeList.find(
      (m) => m.id === this.detailsObj.id
    );
    if (currentRecord != undefined) {
      currentRecord.imageUrl = this.detailsObj.imageUrl;
      currentRecord.title = this.detailsObj.title;
      currentRecord.description = this.detailsObj.description;
      currentRecord.ingredients = this.detailsObj.ingredients;
      currentRecord.instructions = this.detailsObj.instructions;
      currentRecord.nutrition = this.detailsObj.nutrition;
    }
    localStorage.setItem('localRecipe', JSON.stringify(this.recipeList));
    this.onCloseClick();
  }
}

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
