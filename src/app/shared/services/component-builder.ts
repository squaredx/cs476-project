import * as moment from 'moment';
import { IComponent } from '../interfaces/component';
import firebase from 'firebase/app';

export class Builder {
    private id: string;
    private reference: string = "";      //Invoice or Order number
    private itemName: string = "";       //Product or Company name
    private number: number = 0;         //Amount or value
    private startDate: firebase.firestore.Timestamp = firebase.firestore.Timestamp.now();      //Invoice date or record creation date
    private endDate: firebase.firestore.Timestamp = firebase.firestore.Timestamp.now();
    private description: string = "";
    private status: string = "";

    constructor() {
    }

    setId(id: string){
        this.id = id;
        return this;
    }

    setReference(reference: string){
        this.reference = reference;
        return this;
    }

    setItemName(itemName: string){
        this.itemName = itemName;
        return this;
    }

    setNumber(number: number){
        this.number = number;
        return this;
    }

    setStartDate(startDate: string){
        this.startDate = firebase.firestore.Timestamp.fromDate(moment(startDate, 'YYYY-MM-DD', true).toDate());
        return this;
    }

    setEndDate(endDate: string){
        this.endDate = firebase.firestore.Timestamp.fromDate(moment(endDate, 'YYYY-MM-DD', true).toDate());
        return this;
    }

    setDescription(description: string){
        this.description = description;
        return this;
    }

    setStatus(status: string){
        this.status = status;
        return this;
    }

    getId(){
        return this.id;
    }

    createComponent() {
        const obj = {
            ...(this.id) && {id: this.id},
            reference: this.reference,
            itemName: this.itemName,
            number: this.number,
            startDate: this.startDate,
            endDate: this.endDate,
            description: this.description,
            status: this.status,
        } as IComponent;
        this.reset();
        return obj;
    }

    reset() {
        this.id = "";
        this.reference = "";
        this.itemName = "";
        this.number = 0;
        this.startDate = firebase.firestore.Timestamp.now();;
        this.endDate = firebase.firestore.Timestamp.now();;
        this.description = "";
        this.status = "";
    }
}