import firebase from 'firebase/app';

export interface IComponent {
    id?: string;
    reference: string;      //Invoice or Order number
    itemName: string;       //Product or Company name
    number: number;         //Amount or value
    startDate: firebase.firestore.Timestamp;      //Invoice date or record creation date
    endDate: firebase.firestore.Timestamp;        //Due date or last updated date
    description: string;
    status: string;
}