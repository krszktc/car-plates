import { TouchSequence } from 'selenium-webdriver';

export class Plate {
    private __id: string;
    private _name: string;
    private _surname: string;
    private _address: string;
    private _phone: number;
    private _email: string;

    constructor(id?: string, name?: string, surname?: string, address?: string, phone?: number, email?: string) {
        this.__id = id;
        this._name = name;
        this._surname = surname;
        this._address = address;
        this._phone = phone;
        this._email = email;
    }

    get _id(): string {
        return this.__id;
    }

    set _id(id: string) {
        this.__id = this.formatPlate(id);
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = this.capitalize(name);
    }

    get surname(): string{
        return this._surname;
    }

    set surname(surname: string) {
        this._surname = this.capitalize(surname);
    }

    get address(): string {
        return this._address;
    }

    set address(address: string) {
        this._address = this.capitalize(address);
    }

    get phone(): number {
        return this._phone;
    }

    set phone(phone: number) {
        this._phone = phone;
    }

    get email(): string {
        return this._email;
    }

    set email(email: string) {
        this._email = email.toLocaleLowerCase();
    }

    get forRequest() {
        return {_id: this.__id, 
                name: this.name, 
                surname: this.surname, 
                address: this._address, 
                phone: this._phone, 
                email: this._email}
    }

    private capitalize(sentence: string) {
        return sentence
            .toLowerCase()
            .split(' ')
            .map(word => this.checkShortcuts(word))
            .join(' ');
    }

    private checkShortcuts(word: string) {
        const lastChar = word.length - 1;
        if(word.slice(lastChar) === '.') {
            return word.toLowerCase();
        }
        return word.slice(0,1).toUpperCase() + word.slice(1);
    }

    private formatPlate(plate: string) {
        if(plate.length === 3) {
            return plate.toUpperCase() + '-';
        }
        return plate;
    }

}