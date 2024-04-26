import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";
import {GoalService} from "../../services/goal.service";
import {FormsModule} from "@angular/forms";

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

  public action: string = '';
  public frequency: string = '';

  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter();

  constructor(private _goalsService: GoalService) {
  }

  public ngOnInit() {
    console.log('showModal', this.showModal);
  }

  public ngOnChanges(changes:SimpleChanges ) {
    if(changes['showModal'].currentValue) {
       this.showModal = changes['showModal'].currentValue;
    }
  }

  public addGoal(){
    this._goalsService.addGoal({
      id: this._goalsService.goals.length + 1,
      title: this._goalsService.nameGoal,
      action: this.action,
      frequency: this.frequency,
      isCompleted: false
    });
    this._goalsService.nameGoal = '';
    this.action = '';
    this.frequency = '';
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit(this.showModal);
  }

}
