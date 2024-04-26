import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoalModel} from "./models/goal.model";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {GoalService} from "./services/goal.service";
import {ModalComponent} from "./components/modal/modal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule, NgIf, ModalComponent, AsyncPipe, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GoalService]
})
export class AppComponent implements OnInit {

  public title = 'metas';
  public $goals =  this._goalsService.$goals;
  public newGoal: string = '';


  public showModal: boolean = false;

  constructor(private _goalsService: GoalService) {
  }

  public ngOnInit() {

  }


  public addGoal() {
    if(this.newGoal === '') return alert('Ingrese una meta');
    this.showModal = true;
    this._goalsService.nameGoal = this.newGoal;
    this.newGoal = '';
  }

  public editGoal(goal: GoalModel) {
    this._goalsService.editGoal(goal);
  }

  public showDropdown(){
    this.showModal = !this.showModal;
  }

  public deleteGoal(goal: GoalModel) {
    this._goalsService.deleteGoal(goal);
  }

  closeModal(e: any) {
    console.log('closeModal', e);
    this.showModal = e;
  }

  public toggleGoal(goal: GoalModel) {
   this._goalsService.updateStatus(goal);
  }

  protected readonly event = event;
}
