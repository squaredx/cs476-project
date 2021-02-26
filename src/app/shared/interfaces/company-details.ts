import firebase from 'firebase/app';

export interface ICompanyDetails {
    id: string;
    firstName: string;
    lastName: string ;
    email: string;
    companyName: string;
    creationDate: firebase.firestore.Timestamp;
    companyDesc?: string;
    phoneNumber?: string;
}