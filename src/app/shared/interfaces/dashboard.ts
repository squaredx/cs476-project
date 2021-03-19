import firebase from 'firebase/app';
import { IComponent } from './component';

export interface IDashboard {
    lastUpdated: firebase.firestore.Timestamp;
    latestInventory: IComponent[];
    latestProduct: IComponent[];
    upcomingBills: IComponent[];
    upcomingOrders: IComponent[];
    projectedIncome: number;
}