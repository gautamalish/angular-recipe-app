import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailedRecipeComponent } from './detailed-recipe/detailed-recipe.component';
import { FrontPageComponent } from './front-page/front-page.component';
export const routes: Routes = [
    {path:"",title:"Front Page",component:FrontPageComponent},
    {path:"detailed-recipe",title:"Detailed Recipe Page",component:DetailedRecipeComponent}
];
