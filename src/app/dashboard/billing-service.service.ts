import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class BillingServiceService {

  jewelleryBillingDetails: any;
  billingData: any;
  constructor() {}
  getbillingDat() {
    this.jewelleryBillingDetails = [
      {id: 0, label : 'JWT1', name : 'Gold Coin', WSTG: '0', MKC: '111'},
      {id: 1, label : 'JWT2', name : 'Necklace', WSTG: '0.5', MKC: '0.3'},
      {id: 2, label : 'JWT3', name : 'Ring', WSTG: '0.8', MKC: '0.6'},
      {id: 3, label : 'JWT4', name : 'Stud', WSTG: '0.4', MKC: '0.8'},
      {id: 4, label : 'JWT5', name : 'Chain', WSTG: '0.5', MKC: '0.8'},
      {id: 5, label : 'JWT6', name : 'Anklet', WSTG: '0.6', MKC: '0.3'}
      ];
    return this.jewelleryBillingDetails;
  }
  setbillingData( data: any ) {
    this.jewelleryBillingDetails = data;
  }

  getBillingDetail() {
    return this.billingData;
  }
}
