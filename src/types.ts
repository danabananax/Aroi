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
    id?: string
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
export interface addRecipeContainerProps {
    signedInUser: Iuser
    setSelectedRecipe: React.Dispatch<recipe>
}

export interface deleteRecipeProps {
  userId: string
  keyToDelete: string | undefined
  recipeName: string | undefined
}

export interface RecipeLinkProps {
    recipe: recipe
    setSelectedRecipe: React.Dispatch<recipe>
}

export interface setRecipeProps {
  newRecipe: recipe
  setNewRecipe: React.Dispatch<recipe>
}

export interface HomeProps {
  signedInUser: Iuser
  homedata: React.ReactNode
}

// eslint-disable-next-line no-unused-vars
type deleteFunction = (event: React.MouseEvent, identifier: string) => void;
export interface DeletableEntryProps {
  textContent: string
  identifier: string
  deleteFunction: deleteFunction
}
