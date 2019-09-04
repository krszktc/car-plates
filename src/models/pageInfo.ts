import { TouchSequence } from 'selenium-webdriver';

export class PageInfo {
    private _page: number;
    private _size: number;
    private _totalPages: number;
    private _totalElements: number;

    constructor(page?: number, size?: number, totalPages?: number, totalElements?: number) {
        this._page = page ? page + 1 : 1;
        this._size = size ? size: 10;
        this._totalPages = totalPages ? totalPages : 0;
        this._totalElements = totalElements ? totalElements : 0;
    }

    get page(): number {
        return this._page;
    }

    set page(page: number) {
        this._page = page;
    }

    get size(): number {
        return this._size;
    }

    set size(size: number) {
        this._size = size;
    }

    get totalElements(): number {
        return this._totalElements;
    }

    getURL(): string {
        return '?page=' + (this.page - 1) + '&size=' + this.size;
    }

}