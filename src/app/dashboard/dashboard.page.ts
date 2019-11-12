import { BillingServiceService } from './billing-service.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ArrayType } from '@angular/compiler';
import { Router } from '@angular/router';
import {  formatDate } from '@angular/common';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public controls: FormGroup;
  GST: number;
  totalPricewOTGST: number;
  totalPricewTGST: number;
  BillingData: ArrayType;
  result: any;
  billingCalData: any;
  billDate: number;
  blobPdf: any;
  today = new Date();
  jstoday = '';
  pdfObj = null;
  letterObj = {
    to: '',
    from: '',
    text: ''
  }
  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public data: BillingServiceService
    ,         public router: Router) {
    this.controls = this.formBuilder.group({
      GoldRate: ['', Validators.required],
      gram: ['', Validators.required],
      JewType:  ['', Validators.required],
      wastageCharge:  ['', Validators.required],
      makingCharge:  ['', Validators.required],
  });
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
}
  ngOnInit() {
    this.BillingData = this.data.getbillingDat();
    console.log('details--->' + JSON.stringify(this.BillingData));
    console.log('details WSTG--->' + JSON.stringify(this.BillingData[2].WSTG));
  }
logForm() {
    console.log('data selected by the user' + JSON.stringify(this.controls.value));
    console.log('data selected by the user Jewltype' + JSON.stringify(this.controls.value.JewType));
  }
  priceCalculation() {
   this.totalPricewOTGST =
   this.controls.value.gram * this.controls.value.GoldRate +
   this.controls.value.wastageCharge * this.controls.value.gram  +
   +this.controls.value.makingCharge;
   console.log('multiply ' + JSON.stringify(this.controls.value.gram * this.controls.value.GoldRate));
   console.log('totalPricewOTGST ' + JSON.stringify(this.totalPricewOTGST));
   this.GST =  this.totalPricewOTGST * 0.03;
   this.totalPricewTGST = this.totalPricewOTGST * 1 + this.GST * 1 ;
   this.billingCalData = {
     bilNo: Math.floor(Math.random() * (999999 - 100000)) + 100000,
     billDate: this.jstoday,
     goldRate: this.controls.value.gram,
     gram: this.controls.value.gram,
     wastageCharge: this.controls.value.wastageCharge,
     makingCharge: this.controls.value.makingCharge,
     GST: this.GST,
     totalPricewOTGST: this.totalPricewOTGST,
     totalPricewTGST: this.totalPricewTGST,
     jewlType: this.controls.value.JewType
   };
   this.data.billingData = this.billingCalData;
   console.log('befreoe sending data---> ' + JSON.stringify(this.billingCalData));
  }
  navigetToBillingPage() {
    this.router.navigate(['/billing']);

  }
  ionViewDidEnter() {
    // tslint:disable-next-line: only-arrow-functions
    document.addEventListener('backbutton', function(e) {
      console.log('disable back button' );
    } , false);
}
}
