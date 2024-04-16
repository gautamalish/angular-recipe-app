import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderCompComponent } from './header-comp/header-comp.component';
// import { BodyComponent } from './body/body.component';
import {MatIconModule} from '@angular/material/icon';
// import {AngularFireModule} from '@angular/fire';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderCompComponent,MatIconModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showAddRecipe: boolean = false;
  title = 'RecipeApp';
  onShowAddRecipeChange(value:boolean){
    this.showAddRecipe=value
  }
}
