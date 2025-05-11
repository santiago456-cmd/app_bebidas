import {create} from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipesSlice, RecipesSliceType } from './recipeSlice'
import { createFavoriteSlice,  FavoritesSliceType} from './favoritesSlice'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'
import { AISlice, createAISlice } from './aiSlice'


export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))

