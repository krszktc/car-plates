import { Component } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import { Plate } from 'src/models/plate';
import { PlateService } from 'src/services/plate.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'edit-page',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent {

    private readonly EDIT_TITLE = 'Edit Plate';
    private readonly NEW_TITLE = 'New Plate';

    private readonly PLATE_PATTERN = /^[A-Z]{3}-[0-9]{5}$/;
    private readonly NAMES_PATTERN = /^[A-z]+$/;
    private readonly EMAIL_PATTERN = /\S+@\S+\.\S+/;
    private readonly PHONE_PATTERN = /^[0-9]{9}$/;
    private readonly ADDRESS_LENGTH = 70;

    private isIdValid: boolean = true;
    private isNameValid: boolean = true;
    private isSurnameValid: boolean = true;
    private isAddressValid: boolean = true;
    private isPhoneValid: boolean = true;
    private isEmailValid: boolean = true;

    private plate: Plate;
    private pageTitle: string;

    constructor(private router: Router, 
                private dataService: DataService,
                private plateService: PlateService,
                private toastService: ToastrService) {}
  
    ngOnInit() {
      this.plate = this.plateService.editPlate;
      this.pageTitle = this.plate._id ? this.EDIT_TITLE : this.NEW_TITLE;
    }
  
    private disableSave() {
      return !(this.plate._id && this.plate.name && this.plate.surname && this.plate.address && this.plate.phone && this.plate.email && 
              this.isIdValid && this.isNameValid && this.isSurnameValid && this.isAddressValid && this.isPhoneValid && this.isEmailValid);
    }

    private save() {     
      this.sendRequest().subscribe(
        res => {
          this.router.navigate(['./main']);
          this.toastService.success(res['message']);
        }, 
        err => {
          this.toastService.error(err.error['message']);
        });
    }

    private sendRequest(): Observable<String> {
      return this.isEdit() ? this.dataService.updatePlate(this.plate) : this.dataService.addPlate(this.plate);
    }

    private cancel() {
      this.router.navigate(['./main']);
    }

    private isEdit() {
      return this.pageTitle === this.EDIT_TITLE;
    }

    private idChanged() {
      this.isIdValid = this.PLATE_PATTERN.test(this.plate._id);
    }

    private nameChanged() {
      this.isNameValid = this.NAMES_PATTERN.test(this.plate.name);
    }

    private surnameChanged() {
      this.isSurnameValid = this.NAMES_PATTERN.test(this.plate.surname);
    }

    private addressChanged() {
      if(this.plate.address && this.plate.address != '' && this.plate.address.length <= this.ADDRESS_LENGTH) {
        this.isAddressValid = true;
      } else {
        this.isAddressValid = false;
      }
    }

    private phoneChanged() {
      this.isPhoneValid = this.PHONE_PATTERN.test(this.plate.phone.toString());
    }

    private emailChanged() {
      this.isEmailValid = this.EMAIL_PATTERN.test(this.plate.email);
    }

    

}
