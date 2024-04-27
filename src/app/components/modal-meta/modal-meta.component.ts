import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoalService} from "../../services/goal.service";

@Component({
  selector: 'app-modal-meta',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './modal-meta.component.html',
  styleUrl: './modal-meta.component.scss'
})
export class ModalMetaComponent implements OnInit, OnChanges{

  titulo: string = ''
  descripcion: string = '';

  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter();
  codigo: string = '';

  constructor(
    private _GoalService: GoalService
  ) {

  }

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit(this.showModal);
  }

  updateSubGoal() {
    if([this.titulo, this.descripcion].includes('')) return alert('Verifique el formulario');
    console.log({
      titulo: this.titulo,
      descripcion: this.descripcion
    });
    this._GoalService.editGoal(this.codigo, {
      titulo: this.titulo,
      descripcion: this.descripcion,
      codigo: this.codigo
    });
    this.closeModal();
  }

  public ngOnInit() {
    this.codigo = this._GoalService.codeEditGoal;
  }

  public ngOnChanges(changes:SimpleChanges ) {
    if(changes['showModal'].currentValue) {
      this.codigo = this._GoalService.codeEditGoal;
      this.showModal = changes['showModal']?.currentValue;
      this._GoalService.getGoalByCode(this.codigo).subscribe((res: any) => {
        console.log('res', res);
        this.titulo = res.titulo;
        this.codigo = res.codigo;
        this.descripcion = res.descripcion;
      });
    }
  }

}
