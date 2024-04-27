import {Submeta} from "./subgoal.model";

export interface GoalModel {
  id?: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  estado?: boolean;
  created_at?: string;
  updated_at?: string;
  submetas?: Submeta[];
}
