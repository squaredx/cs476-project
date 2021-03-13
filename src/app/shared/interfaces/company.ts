import firebase from 'firebase/app';

export interface ICompany {
    companyName: string;
    creationDate: firebase.firestore.Timestamp;
    companyDesc?: string;
    numBills: number;
    numInventory: number;
    numOrders: number;
    numProducts: number;
}