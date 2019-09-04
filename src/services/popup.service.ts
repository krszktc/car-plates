import {Injectable} from "@angular/core";
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs';
import { ConfirmationComponent } from 'src/components/confirmation/confirmation.component';

@Injectable()
export class PopupService {

  private POPUP_OPTIONS_SMALL: NgbModalOptions = {size: 'sm', backdrop: "static"};
  private POPUP_OPTIONS_LARGE: NgbModalOptions = {centered: true, size: 'lg', backdrop: "static"};

  constructor(private modalService: NgbModal) {
  }

  private answerSubject: Subject<string> = new Subject();

  public getAnswerSubject(): Observable<string> {
    return this.answerSubject.asObservable();
  }

  public showConfirmation(plateId: string) {
    const modalRef = this.modalService.open(ConfirmationComponent, this.POPUP_OPTIONS_SMALL);
    modalRef.componentInstance.plateId = plateId;
    modalRef.componentInstance.answer.subscribe(answer => this.answerSubject.next(answer));
  }
  
}
