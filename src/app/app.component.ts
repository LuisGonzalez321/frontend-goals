import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoalModel} from "./models/goal.model";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GoalService} from "./services/goal.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GoalService]
})
export class AppComponent {

  public title = 'metas';
  public goals: GoalModel[] = [];
  public newGoal: string = '';

  public showModal: boolean = true;

  constructor(private _todoService: GoalService) {
    this.goals = _todoService.goals;
  }


  public addGoal() {

    if(this.newGoal === '') return alert('Ingrese una meta');

    this._todoService.addGoal({
      id: this.goals.length + 1,
      title: this.newGoal,
      completed: false
    });
    this.newGoal = '';
  }

  public editGoal(goal: GoalModel) {

  }

  public showDropdown(){
    this.showModal = !this.showModal;
  }

  public deleteGoal(goal: GoalModel) {

  }

}
