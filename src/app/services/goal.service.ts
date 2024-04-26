import { Injectable } from '@angular/core';
import {GoalModel} from "../models/goal.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class GoalService {

  public goals: GoalModel[] = [];

  constructor(httpClient: HttpClient) {
    console.log('GoalService constructor');
    httpClient.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  public addGoal(goal: GoalModel) {
    this.goals.push(goal);
  }

  public editGoal(goal: GoalModel) {
    this.goals = this.goals.map((g: GoalModel) => {
      if(g.id === goal.id) {
        g = goal;
      }
      return g;
    });
  }

}
