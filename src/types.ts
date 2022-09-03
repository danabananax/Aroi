import { User } from 'firebase/auth';

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
