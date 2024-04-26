import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoalModel} from "./models/goal.model";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GoalService} from "./services/goal.service";
import {ModalComponent} from "./components/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule, NgIf, ModalComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GoalService]
})
export class AppComponent {

  public title = 'metas';
  public $goals = this._todoService.$goals;
  public newGoal: string = '';

  public showModal: boolean = false;

  constructor(private _todoService: GoalService) {
  }


  public addGoal() {

    if(this.newGoal === '') return alert('Ingrese una meta');
    this.showModal = true;
    this.newGoal = '';
  }

  public editGoal(goal: GoalModel) {
    this._todoService.editGoal(goal);
  }

  public showDropdown(){
    this.showModal = !this.showModal;
  }

  public deleteGoal(goal: GoalModel) {
    this._todoService.deleteGoal(goal);
  }

  closeModal(e: any) {
    console.log('closeModal', e);
    this.showModal = e;
  }

  public toggleGoal(){

  }

  protected readonly event = event;
}
