import { Component, OnInit, inject } from '@angular/core';
import { Route,RouterLink, RouterModule } from '@angular/router';
import { RecipeDetails } from '../front-page/front-page.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FrontPageComponent } from '../front-page/front-page.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-detailed-recipe',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,FrontPageComponent,RouterModule],
  templateUrl: './detailed-recipe.component.html',
  styleUrl: './detailed-recipe.component.css'
})
export class DetailedRecipeComponent implements OnInit {
  
  activeRoute:ActivatedRoute=inject(ActivatedRoute)
  router: Router=inject(Router);
  recipe:any;
  constructor(private sanitizer:DomSanitizer){

  }
  ngOnInit(): void {
    this.recipe=history.state;
  }
}
