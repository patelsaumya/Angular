import {Component, OnInit} from '@angular/core';
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService] // service gets destroyed each time you leave the page where this component is loaded. As if you visit other page, this component gets destroyed.
})
export class RecipesComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }
}
