import { Component,Input,Output,EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-header-comp',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './header-comp.component.html',
  styleUrl: './header-comp.component.css'
})

export class HeaderCompComponent {

  // @Output() showAddRecipeChange:EventEmitter<boolean> = new EventEmitter<boolean>();
  // AddRecipe(){
  //   this.showAddRecipeChange.emit(true);
  // }
}
