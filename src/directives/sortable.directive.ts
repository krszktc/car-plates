import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { SortDirection, SortEvent } from 'src/models/sort-event';

@Directive({
    selector: 'th[sortable]',
    host: {
      '[class.asc]': 'direction === "asc"',
      '[class.desc]': 'direction === "desc"',
      '(click)': 'rotate()'
    }
  })
  export class NgbdSortableHeader {
    @Input() sortable: string;
    @Input() direction: SortDirection = '';
    @Output() sort = new EventEmitter<SortEvent>();
  
    rotate() {
        const rotateDirection: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': 'asc', '': 'asc' };
        this.direction = rotateDirection[this.direction];
        this.sort.emit({column: this.sortable, direction: this.direction});
    }
  }