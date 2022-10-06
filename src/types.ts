import { User } from 'firebase/auth';
import React from 'react';

export type Iuser = User | null;

export interface recipe {
    active_time: string
    group: Array<string>
    ingredients: Record<string, string>
    method: Array<string>
    name: string
    servings: number
    tags: Array<string>
    total_time: string
}

export interface recipeEntry {
  [key: string]: recipe
}

export interface ViewRecipeProps {
  signedInUser: Iuser | undefined
  selectedRecipe: recipe | undefined
}

export interface signedInUserProp {
    signedInUser: Iuser
}

export interface setRecipeProps {
  newRecipe: recipe
  setNewRecipe: React.Dispatch<recipe>
}

export interface HomeProps {
  signedInUser: Iuser
  setSelectedRecipe: React.Dispatch<recipe>
}
