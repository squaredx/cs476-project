import firebase from 'firebase/app';
import { IEntry } from './entry';

export interface IDashboard {
    lastUpdated: firebase.firestore.Timestamp;
    latestInventory: IEntry[];
    latestProduct: IEntry[];
    upcomingBills: IEntry[];
    upcomingOrders: IEntry[];
    projectedIncome: number;
}