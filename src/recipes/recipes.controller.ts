import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  Render,
} from '@nestjs/common';
import { Response } from 'express';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Recipes } from './recipes.entity';
import { RecipesService } from './recipes.service';

@Controller('recipes')

export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  @Render('../views/home')
  root() {
    return { title: 'Hello',body: 'Home Page' };
  }

  @Get('favList')
  async getFavRecipes() {
     let fav = this.recipesService.getFavRecipes(); 
     return fav;
  }

  @Get('list')
  findAll() {
    return this.recipesService.getRecipes();    
  }

  @Post() create(@Body() recipes: Recipes) {
    return this.recipesService.createRecipes(recipes);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.recipesService.findOne(id);
  }

  

  @Patch(':id')
  async editRecipes(@Body() recipes: Recipes, @Param('id') id: number): Promise<Recipes> {
    const recipeEdited = await this.recipesService.editRecipes(id, recipes);
    return recipeEdited;
  }

  @Post(':id/favRecipe')
  async favRecipes(@Body() recipes: Recipes, @Param('id') id: number): Promise<Recipes> {
    const recipeFav = await this.recipesService.favRecipes(id, recipes);
    return recipeFav;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.recipesService.remove(id);
  }

}
