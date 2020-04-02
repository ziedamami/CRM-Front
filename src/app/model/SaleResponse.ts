export class SaleResponse {
    _id: Object;
    dateOfSale: Date;
    seller: Object;
    // products:Object[];
    amount: number;
    typeofPackage: string;
    departurePackage: string;
    destinationPackage: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    quantity:number;
}

export class Bill {
    logo: string;
    header: string;
    clientName: string;
    clientAdress: string;
    contactNo: number;
    email: string;
    sales: SaleResponse[] = [];
    otherDetails: string;


    constructor() {
        this.sales.push(new SaleResponse());

    }
}
