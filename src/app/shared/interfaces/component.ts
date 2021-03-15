import firebase from 'firebase/app';

export interface IComponent {
    id: string;
    reference: string;      //Invoice or Order number
    itemName: string;       //Product or Company name
    number: string;         //Amount or value
    startDate: string;      //Invoice date or record creation date
    endDate: string;        //Due date or last updated date
    description: string;
    status: string;
}