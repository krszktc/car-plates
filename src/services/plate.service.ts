import { Injectable } from '@angular/core';
import { Plate } from 'src/models/plate';

@Injectable()
export class PlateService {

    private _editPlate: Plate = new Plate();

    get editPlate(): Plate {
        return this._editPlate;
    }

    set editPlate(plate: Plate) {
        this._editPlate = plate;
    }

}