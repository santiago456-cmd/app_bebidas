import api from '../lib/axios'
import { CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema } from '../schemas/recipesSchema'
import { Drink, SearchFilter } from '../types'
 
export async function getCategories() {
    const url = `/list.php?c=list`
    const {data} = await api(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)

    //escribir en el state
    if (result.success) {
        return result.data
    }
}

export async function getRecipes (filters: SearchFilter){
    const url = `/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const {data} = await api(url)
    const result = DrinksAPIResponse.safeParse(data)
    
    if (result.success) {
        return result.data
    }
}

export async function getRecipeById (id: Drink['idDrink']) {
    const url = `/lookup.php?i=${id}`
    const {data} = await api(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    console.log(result)

    if(result.success){
        return result.data
    }
}