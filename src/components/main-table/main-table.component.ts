import { Component, Input, OnChanges, ViewChildren, QueryList, Output, EventEmitter, OnInit } from '@angular/core';
import { Plate } from 'src/models/plate';
import { PageInfo } from 'src/models/pageInfo';
import { SortEvent } from 'src/models/sort-event';
import { NgbdSortableHeader } from 'src/directives/sortable.directive';
import { Filter } from 'src/models/filter';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnChanges, OnInit {
  @Input() data: Object;
  @Output() onChange = new EventEmitter<String>();
  @Output() onRemove = new EventEmitter<String>();
  @Output() onEdit = new EventEmitter<Plate>();

  @ViewChildren(NgbdSortableHeader) 
  private headers: QueryList<NgbdSortableHeader>;

  private readonly INPUT_DEBOUNCE_TIME = 500;

  private plates: Plate[];
  private pageInfo: PageInfo;
  private filter: Filter = new Filter();
  private debounce: Subject<String> = new Subject();

  ngOnInit() {
    this.debounce
      .pipe(debounceTime(this.INPUT_DEBOUNCE_TIME))
      .subscribe(() => this.onCriteriaChange());
  }

  ngOnChanges() {
    if(this.data) {
        const pageInfoData = this.data['pageInfo']
        this.plates = this.data['data'];
        this.pageInfo = new PageInfo(pageInfoData.page, pageInfoData.size, pageInfoData.totalPages, pageInfoData.totalElements);
    }
  }

  reset() {
    this.filter = new Filter();
    this.headers.forEach(header => header.direction = '');
    this.resetCriteriaAndGetData();
  }

  private onSort({column, direction}: SortEvent) {
    this.filter.setColumOrder(column, direction)
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.resetCriteriaAndGetData();
  }

  private resetCriteriaAndGetData() {
    this.pageInfo.page = 1;
    this.onCriteriaChange();
  }

  private onDebounceCriteriaChange() {
    this.pageInfo.page = 1;
    this.debounce.next();
  }

  private onCriteriaChange() {    
    const url = this.pageInfo.getURL() + this.filter.getUrl();    
    this.onChange.emit(url);
  }

  private edit(plate: Plate) {
    this.onEdit.next(plate);
  }

  private remove(plateId: string) {
    this.onRemove.next(plateId);
  }

}