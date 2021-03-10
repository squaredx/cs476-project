import firebase from 'firebase/app';

export interface IEntry {
    id: string;
    name: string;
    type: string;
    description: string;
    date: number;
}