import { StateCreator } from 'zustand'
import { Recipe } from '../types'
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'

export type FavoritesSliceType = {
    favorites: Recipe[],
    handleClickFavorite: (Recipe:Recipe) => void,
    favoriteExist: (id: Recipe['idDrink']) => boolean 
    loadFromStorage: () => void
}

export const createFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if (get().favoriteExist(recipe.idDrink)) {
            set({
                favorites: [...get().favorites.filter(favorite => favorite.idDrink !==recipe.idDrink)]
            })
            createNotificationSlice(set, get, api).showNotification({text: 'Se elimino de Favoritos', error: false })
        } else {
            set({
                favorites: [...get().favorites, recipe]
            })
            createNotificationSlice(set, get, api).showNotification({text: 'Se añadio a Favoritos', error: false })
        }
        createRecipesSlice(set, get, api).closeModal()
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})