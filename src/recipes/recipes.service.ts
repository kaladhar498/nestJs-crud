import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipes } from './recipes.entity';

@Injectable()
export class RecipesService {
	constructor(
	    @InjectRepository(Recipes) private recipesRepository: Repository<Recipes>,
	) {}

	/*get all recipes*/
	async getRecipes(): Promise<Recipes[]> {
	   return await this.recipesRepository.find();
	}

	/*get all fav recipes*/
	async getFavRecipes(): Promise<Recipes[]> {
	   return await this.recipesRepository.find({isFav:true});
	}
	
	/*store recipes*/
	async createRecipes(recipes: Recipes) {
	  this.recipesRepository.save(recipes);
	}

	/*get one recipe*/
	findOne(id: string): Promise<Recipes> {
	   return this.recipesRepository.findOne(id);
	}

	/*delete recipes*/
	async remove(id: string): Promise<void> {
	   await this.recipesRepository.delete(id);
	   // return "Deleted Successfully"
	}

	/*edit recipes*/
	async editRecipes(id: number, recipes: Recipes): Promise<Recipes> {
		const editedRecipes = await this.recipesRepository.findOne(id);
		if (!editedRecipes) {
	      throw new NotFoundException('Recipe is not found');
	    }
	    editedRecipes.description = recipes.description;
	    editedRecipes.title = recipes.title;
	    editedRecipes.isFav = recipes.isFav;
	    await editedRecipes.save();
	    return editedRecipes;
	}
	
	/*fav-unfav-recipes*/
	async favRecipes(id: number, recipes: Recipes): Promise<Recipes> {
		const favRecipes = await this.recipesRepository.findOne(id);
		if (!favRecipes) {
	      throw new NotFoundException('Recipe is not found');
	    }
	    favRecipes.isFav = recipes.isFav;
	    await favRecipes.save();
	    return favRecipes;
	}
	
}
