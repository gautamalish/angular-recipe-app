import { Component,Input,Output,EventEmitter, ViewChild, ElementRef } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
// import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-header-comp',
  standalone: true,
  imports: [MatIconModule,CommonModule],
  templateUrl: './header-comp.component.html',
  styleUrl: './header-comp.component.css'
})

export class HeaderCompComponent {
  @Output() addRecipeClicked: EventEmitter<string> = new EventEmitter<string>();
  addRecipe() {
    this.addRecipeClicked.emit();
  }
}
