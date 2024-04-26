import { Injectable } from '@angular/core';
import {GoalModel} from "../models/goal.model";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GoalService {

  public goals: GoalModel[] = [];
  public $goals = new Subject<GoalModel[]>();

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
    this.$goals.next(this.goals);
  }

  public editGoal(goal: GoalModel) {
    this.goals = this.goals.map((g: GoalModel) => {
      if(g.id === goal.id) {
        g.title = goal.title;
        g.action = goal.action;
        g.frequency = goal.frequency;
      }
      return g;
    });
    this.$goals.next(this.goals);
  }

  public deleteGoal(goal: GoalModel) {
    this.goals = this.goals.filter((g: GoalModel) => g.id !== goal.id);
    this.$goals.next(this.goals);
  }

  public updateStatus(goal: GoalModel) {
    this.goals = this.goals.map((g: GoalModel) => {
      if(g.id === goal.id) {
        g.isCompleted = !g.isCompleted;
      }
      return g;
    });
    this.$goals.next(this.goals);
  }

}
