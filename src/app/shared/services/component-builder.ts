import { IComponent } from '../interfaces/component';

export class Builder {
    private id: string;
    private reference: string = "";      //Invoice or Order number
    private itemName: string = "";       //Product or Company name
    private number: string = "";         //Amount or value
    private startDate: string = "";      //Invoice date or record creation date
    private endDate: string = "";
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

    setNumber(number: string){
        this.number = number;
        return this;
    }

    setStartDate(startDate: string){
        this.startDate = startDate;
        return this;
    }

    setEndDate(endDate: string){
        this.endDate = endDate;
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

    createComponent(){
        return {
            id: this.id,
            reference: this.reference,
            itemName: this.itemName,
            number: this.number,
            startDate: this.startDate,
            endDate: this.endDate,
            description: this.description,
            status: this.status,
        } as IComponent
    }
}