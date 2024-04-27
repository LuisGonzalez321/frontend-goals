import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {GoalService} from "../../services/goal.service";
import {FormsModule} from "@angular/forms";
import {SubgoalService} from "../../services/subgoal.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit,  OnChanges{


  public accion: string = '';
  public frecuencia: string = '';
  public codigo: string = '';
  public descripcion: string = '';
  public estado: boolean = false;
  @Input() public meta_id: number = 0;

  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter();

  constructor(private _subGoalService: SubgoalService) {
  }

  public ngOnInit() {
    console.log('showModal', this.showModal);
  }

  public ngOnChanges(changes:SimpleChanges ) {
    if(changes['showModal'].currentValue) {
       this.showModal = changes['showModal']?.currentValue;
    }
    if(changes['meta_id']?.currentValue) {
      this.meta_id = changes['meta_id']?.currentValue ?? this._subGoalService.idGoal;
    }
  }

  public addSubGoal(){
    if([this.codigo, this.descripcion].includes('')) return alert('Verifique el formulario');
    this._subGoalService.addSubGoal({
      codigo: this.codigo,
      descripcion: this.descripcion,
      estado: this.estado,
      accion: this.accion,
      frecuencia: this.frecuencia,
      meta_id: this.meta_id
    });
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit(this.showModal);
  }

}
