import firebase from 'firebase/app';

export class CompanyDetails {
    id: string = '';
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    companyName: string = '';
    creationDate: firebase.firestore.Timestamp = firebase.firestore.Timestamp.now();
    companyDesc?: string = '';
    phoneNumber?: string = '';

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        companyName: string,
        creationDate: firebase.firestore.Timestamp,
        companyDesc?: string,
        phoneNumber?: string,
    ){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.companyName = companyName;
        this.creationDate = creationDate;
        this.companyDesc = companyDesc;
        this.phoneNumber = phoneNumber;
    }
}

var companyDetailsAdapter = {
    toFirestore: function(companyDetails) {
        return {
            firstName: companyDetails.firstName,
            lastName: companyDetails.lastName,
            email: companyDetails.email,
            companyName: companyDetails.companyName,
            creationDate: companyDetails.creationDate,
            companyDesc: companyDetails.companyDesc,
            phoneNumber: companyDetails.phoneNumber,
        };
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options);
        return new CompanyDetails(data.id, data.firstName, data.lastName, data.email, data.companyName, data.creationDate, data.companyDesc, data.phoneNumber);
    }
}

export class CompanyDetailsAdapter implements firebase.firestore.FirestoreDataConverter<CompanyDetails> {
    toFirestore(companyDetails: CompanyDetails): firebase.firestore.DocumentData {
        return {
            firstName: companyDetails.firstName,
            lastName: companyDetails.lastName,
            email: companyDetails.email,
            companyName: companyDetails.companyName,
            creationDate: companyDetails.creationDate,
            companyDesc: companyDetails.companyDesc,
            phoneNumber: companyDetails.phoneNumber,
        };
    }
    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>, options: firebase.firestore.SnapshotOptions): CompanyDetails {
        const data = snapshot.data(options);
        return new CompanyDetails(data.id, data.firstName, data.lastName, data.email, data.companyName, data.creationDate, data.companyDesc, data.phoneNumber);
    }
}