import { Injectable } from '@angular/core';
import {GoalModel} from "../models/goal.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GoalService {

  public goals: GoalModel[] = [
    {
      id: 1,
      title: 'Goal 1',
      action: 'Action 1',
      frequency: 'Frequency 1',
      isCompleted: false
    },
    {
      id: 2,
      title: 'Goal 2',
      action: 'Action 2',
      frequency: 'Frequency 2',
      isCompleted: false
    },
    {
      id: 3,
      title: 'Goal 3',
      action: 'Action 3',
      frequency: 'Frequency 3',
      isCompleted: false
    },
    {
      id: 4,
      title: 'Goal 4',
      action: 'Action 4',
      frequency: 'Frequency 4',
      isCompleted: true
    },
  ];
  public $goals = new BehaviorSubject<GoalModel[]>(this.goals);
  public nameGoal: string = '';

  constructor(httpClient: HttpClient) {
    console.log('GoalService constructor');
    // httpClient.get('https://pokeapi.co/api/v2/pokemon/ditto').subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    //   error: (error) => {
    //     console.error(error);
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   }
    // });
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
    this.goals[this.goals.findIndex((g: GoalModel) => g.id === goal.id)].isCompleted = !goal.isCompleted;
    this.$goals.next(this.goals);
  }

}
