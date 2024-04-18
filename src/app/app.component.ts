import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderCompComponent } from './header-comp/header-comp.component';
// import { BodyComponent } from './body/body.component';
import {MatIconModule} from '@angular/material/icon';
// import {AngularFireModule} from '@angular/fire';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderCompComponent,MatIconModule,CommonModule,BodyComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  showAddRecipe: boolean = false;
  title = 'RecipeApp';
  detailsObj:RecipeDetails=new RecipeDetails();
  recipeList:RecipeDetails[]=[]
  filteredRecipeList: RecipeDetails[] = [];
  searchText:string="";
  ngOnInit(): void {
    const localData=localStorage.getItem("localRecipe")
    if(localData!=null){
      this.recipeList=JSON.parse(localData)
    }
  }
  @ViewChild("close") closeModal:ElementRef | undefined
  @ViewChild("exampleModal") exampleModal:ElementRef | undefined
  changeModalDisplay(){
    if(this.exampleModal){
      this.exampleModal.nativeElement.style.display="block"
    }
  }
  onCloseClick(){
    this.detailsObj=new RecipeDetails();
    if(this.exampleModal){
      this.exampleModal.nativeElement.style.display="none"
    }
  }
  onEdit(item:RecipeDetails){
    this.detailsObj=item;
    this.changeModalDisplay()
  }
  // filterRecipes() {
  //   this.filteredRecipeList = this.recipeList.filter(item =>
  //     item.title.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }

  addRecipe(){
    const isLocalPresent=localStorage.getItem("localRecipe")
    if(isLocalPresent!=null){
      const oldArray=JSON.parse(isLocalPresent);
      this.detailsObj.id=oldArray.length+1;
      oldArray.push(this.detailsObj);
      this.recipeList=oldArray;
      localStorage.setItem("localRecipe",JSON.stringify(oldArray) )
    }
    else{
      const newArr=[];
      newArr.push(this.detailsObj);
      this.detailsObj.id=1;
      this.recipeList=newArr;
      localStorage.setItem("localRecipe",JSON.stringify(newArr) )
    }
    this.onCloseClick()
  }
  onDelete(item:RecipeDetails){
    const isDelete=confirm("Are you sure you want to delete the recipe?");
    if(isDelete){
      const currentRecord=this.recipeList.findIndex(m=>m.id===item.id);
      this.recipeList.splice(currentRecord,1);
      localStorage.setItem("localRecipe",JSON.stringify(this.recipeList) )
    }
  }
  updateRecipe(){
    const currentRecord=this.recipeList.find(m=>m.id===this.detailsObj.id);
    if(currentRecord!=undefined){
      currentRecord.imageUrl=this.detailsObj.imageUrl;
      currentRecord.title=this.detailsObj.title;
      currentRecord.description=this.detailsObj.description;
      currentRecord.ingredients=this.detailsObj.ingredients;
      currentRecord.instructions=this.detailsObj.instructions;
      currentRecord.nutrition=this.detailsObj.nutrition;
    }
    localStorage.setItem("localRecipe",JSON.stringify(this.recipeList) )
    this.onCloseClick()
  }
}

export class RecipeDetails{
  id:number;
  imageUrl:string;
  title:string;
  description:string;
  ingredients:string;
  instructions:string;
  nutrition:string;

  constructor(){
    this.imageUrl="";
    this.title="";
    this.description="";
    this.ingredients="";
    this.instructions="";
    this.nutrition="";
    this.id=0;
  }
}
