import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoalModel} from "./models/goal.model";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormGroup, FormsModule} from "@angular/forms";
import {GoalService} from "./services/goal.service";
import {ModalComponent} from "./components/modal/modal.component";
import {SubgoalService} from "./services/subgoal.service";
import {ModalMetaComponent} from "./components/modal-meta/modal-meta.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, FormsModule, NgIf, ModalComponent, AsyncPipe, NgClass, DatePipe, ModalMetaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [GoalService]
})
export class AppComponent implements OnInit {

  public $goals =  this._goalsService.getGoals();

  public codigo: string = 'V'+Math.random();
  public titulo: string = "Meta 2929"+Math.random();
  public descripcion: string = "Es una meta";
  public estado: boolean = false;

  public showModal: boolean = false;
  public showModalEditGoal: boolean = false;

  public codeEditGoal: string = '';

  constructor(
    private _goalsService: GoalService,
    public _subGoalService: SubgoalService
  ) {

  }

  public ngOnInit() {

  }


  public addGoal() {
    if([this.codigo, this.titulo, this.descripcion].includes('')) return alert('Verifique el formulario');
    this._goalsService.addGoal({
      codigo: this.codigo,
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado
    }).subscribe((res: any) => {
      console.log('res', res);
      this.$goals = this._goalsService.getGoals();
      this.codigo = '';
      this.titulo = '';
      this.descripcion = '';
      this.estado = false;
    });
  }

  public editGoal(goal: GoalModel) {
    this.showModalEditGoal = true;
    this._goalsService.codeEditGoal = goal.codigo;
  }

  public showDropdown(){
    this.showModal = !this.showModal;
  }

  public deleteGoal(goal: GoalModel) {
    this._goalsService.deleteGoal(goal);
    this.$goals = this._goalsService.getGoals();
  }

  closeModal(e: any) {
    console.log('closeModal', e);
    this.showModal = e;
  }

  public toggleGoal(goal: GoalModel) {
   goal.estado = true;
   this._goalsService.updateStatus(goal.codigo, goal);
   goal.estado ? this._goalsService.getGoals() : null;
  }

  protected readonly event = event;

  public addSubgoal(goal: GoalModel) {
    this.showModal = true;
    this._subGoalService.idGoal = goal.id;
  }

  closeModalEditGoal($event: any) {
    this.showModalEditGoal = $event;
  }
}
