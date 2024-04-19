import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
// import { BodyComponent } from './body/body.component';
import { MatIconModule } from '@angular/material/icon';
// import {AngularFireModule} from '@angular/fire';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    CommonModule,
    FrontPageComponent,
    FormsModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RecipeApp';
}


