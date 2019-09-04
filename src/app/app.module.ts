import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from 'src/pages/main/main.component';
import { EditComponent } from 'src/pages/edit/edit.component';
import { MainTableComponent } from 'src/components/main-table/main-table.component';
import { DataService } from 'src/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbdSortableHeader } from 'src/directives/sortable.directive';
import { ConfirmationComponent } from 'src/components/confirmation/confirmation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PopupService } from 'src/services/popup.service';
import { PlateService } from 'src/services/plate.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EditComponent,
    MainTableComponent,
    NgbdSortableHeader,
    ConfirmationComponent
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    DataService,
    PopupService,
    PlateService,
    ToastrService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationComponent]
})
export class AppModule { }
