import firebase from 'firebase/app';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    companyName: string;
    companyDesc?: string;
    companyLink?: firebase.firestore.DocumentReference;
}