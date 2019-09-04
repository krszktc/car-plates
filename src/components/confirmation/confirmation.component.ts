import { Component, EventEmitter, Output, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  @Input()
  private plateId: string;
  @Output()
  private answer = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  private yes() {
    this.answer.next('YES')
    this.activeModal.close();
  }

  private no() {
    this.answer.next('NO')
    this.activeModal.close();
  }

}