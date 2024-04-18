import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderCompComponent } from './header-comp/header-comp.component';
// import { BodyComponent } from './body/body.component';
import {MatIconModule} from '@angular/material/icon';
// import {AngularFireModule} from '@angular/fire';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body/body.component';
import { FormsModule } from '@angular/forms';
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
  ngOnInit(): void {
    const localData=localStorage.getItem("localRecipe")
    if(localData!=null){
      this.recipeList=JSON.parse(localData)
    }
  }
  @ViewChild("close") closeModal:ElementRef | undefined
  @ViewChild("exampleModal") exampleModal:ElementRef | undefined
  changeModalDisplay(value:string){
    this.detailsObj=new RecipeDetails();
    if(this.exampleModal){
      this.exampleModal.nativeElement.style.display="block"
    }
  }
  onCloseClick(){
    if(this.exampleModal){
      this.exampleModal.nativeElement.style.display="none"
    }
  }

  addRecipe(){
    const isLocalPresent=localStorage.getItem("localRecipe")
    if(isLocalPresent!=null){
      const oldArray=JSON.parse(isLocalPresent);
      oldArray.push(this.detailsObj);
      this.recipeList=oldArray;
      localStorage.setItem("localRecipe",JSON.stringify(oldArray) )
    }
    else{
      const newArr=[];
      newArr.push(this.detailsObj);
      this.recipeList=newArr;
      localStorage.setItem("localRecipe",JSON.stringify(newArr) )
    }
    if(this.exampleModal){
    this.exampleModal.nativeElement.style.display="none"
    }
  }
}

export class RecipeDetails{
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
  }
}
