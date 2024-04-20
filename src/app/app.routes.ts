import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailedRecipeComponent } from './detailed-recipe/detailed-recipe.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { FavouritesComponent } from './favourites/favourites.component';
export const routes: Routes = [
    {path:"",title:"Recipe App",component:FrontPageComponent},
    {path:"detailed-recipe",title:"Recipe App",component:DetailedRecipeComponent},
    {path:"favourites",title:"Recipe App",component:FavouritesComponent}
];
