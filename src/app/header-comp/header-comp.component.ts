import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { Route, RouterLink, Router } from '@angular/router';
// import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

@Component({
  selector: 'app-header-comp',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule,RouterLink],
  templateUrl: './header-comp.component.html',
  styleUrl: './header-comp.component.css',
})
export class HeaderCompComponent {
  searchText: string = '';
  // using output to send the data to the parent component
  @Output() addRecipeClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchTextChanged: EventEmitter<string> =
    new EventEmitter<string>();
  addRecipe() {
    this.addRecipeClicked.emit();
  }
  // Emitting the searchText when it is changed
  onSearchTextChange() {
    this.searchTextChanged.emit(this.searchText);
  }
}
