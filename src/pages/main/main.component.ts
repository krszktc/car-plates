import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Plate } from 'src/models/plate';
import { PopupService } from 'src/services/popup.service';
import { Subscription } from 'rxjs';
import { MainTableComponent } from 'src/components/main-table/main-table.component';
import { Router } from '@angular/router';
import { PlateService } from 'src/services/plate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'main-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{

    @ViewChild(MainTableComponent) 
    private mainTable: MainTableComponent;

    private data: Object;
    private plateToRemove: string;
    private subscribtions: Subscription[] = [];

    constructor(private router: Router,
                private dataService: DataService, 
                private plateService: PlateService,
                private popupService: PopupService,
                private toastService: ToastrService) {}

    ngOnInit() {
        this.subscribtions.push(this.popupService.getAnswerSubject().subscribe(answer => this.removePlate(answer)));
        this.getData();
    }

    ngOnDestroy() {
        this.subscribtions.forEach(sb => sb.unsubscribe);
    }

    private getData(url?: string) {
        this.dataService.getAllPlates(url).subscribe(res => this.data = res);
    }

    private onEdit(plate: Plate) {
        this.plateService.editPlate = new Plate(plate._id, plate.name, plate.surname, plate.address, plate.phone, plate.email);
        this.router.navigate(['./edit']);
    }

    private onRemove(plateId: string) {
        this.plateToRemove = plateId;
        this.popupService.showConfirmation(plateId);
    }

    private removePlate(answer: string) {
        if(answer && answer === 'YES' && this.plateToRemove) {
            this.dataService.removePlate(this.plateToRemove)
            .subscribe(
                success => {
                    this.mainTable.reset();
                    this.toastService.success(success['message']);
                },
                error => {
                    this.toastService.error(error.error['message']);
                });
        }
    }

    private addPlate() {
        this.plateService.editPlate = new Plate();;
        this.router.navigate(['./edit']);
    }
}
