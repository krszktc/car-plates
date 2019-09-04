import { TouchSequence } from 'selenium-webdriver';

export class Filter {
    private _order: string;
    private _column: string;
    private _value: string;

    get order(): string {
        return this._order;
    }

    get column(): string {
        return this._column;
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }

    setColumOrder(column: string, order: string) {
        this._column = column;
        this._order = order;
    }

    getUrl(): string {
        let url = ''
        if(this.order && this.order != '' && this.column && this.column != '') {
            url = url + '&order=' + this.order + '&column=' + this.column;
        }
        if(this.value) {
            url = url + '&filter=' + this.value;
        }
        return url;
    }
    
}