import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { BillingServiceService } from './../dashboard/billing-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {
  Bdata: any;
  id: any;
  loading: any;
  messages: any[] = [];
  products = [];
  subscription: Subscription;
  constructor(public route: ActivatedRoute, public router: Router, public dataService: BillingServiceService,
              public fileOpener: FileOpener, private file: File) {
    this.Bdata = this.dataService.getBillingDetail();
    console.log('data  from the subscription1 -->' +  this.Bdata );
    console.log('data  from the subscription2 -->' +  JSON.stringify(this.Bdata ));
  }

  ngOnInit() {
  }
  exportPdf() {
    //this.presentLoading('Creating PDF file...');
    const div = document.getElementById('printable-area');
    const options = { background: 'white', height: div.clientWidth, width: div.clientHeight };
    debugger;
    domtoimage.toPng(div, options).then((dataUrl) => {
      //Initialize JSPDF
      var doc = new jsPDF('p', 'mm', 'a4') ;
      //Add image Url to PDF
      doc.addImage(dataUrl, 'PNG', 20, 20, 240, 180);
  
      let pdfOutput = doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }
  
  
      //This is where the PDF file will stored , you can change it as you like
      // for more information please visit https://ionicframework.com/docs/native/file/
      const directory = this.file.dataDirectory ;
      const fileName = 'invoice.pdf';
      let options: IWriteOptions = { replace: true };
      console.log(directory + '--' + fileName + '');
        debugger;
      this.file.checkFile(directory, fileName).then((success) => {
        //Writing File to Device
        console.log(directory + '--' + fileName + '');
        debugger;
        this.file.writeFile(directory, fileName, buffer, options)
        .then((success) => {
          
          console.log('File created Succesfully' + JSON.stringify(success));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        })
        .catch((error)=> {
          
          console.log('Cannot Create File ' +JSON.stringify(error));
        });
      })
      .catch((error) => {
        //Writing File to Device
        this.file.writeFile(directory,fileName,buffer)
        .then((success)=> {
          
          console.log('File created Succesfully' + JSON.stringify(success));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        })
        .catch((error)=> {
          
          console.log("Cannot Create File " +JSON.stringify(error));
        });
      });
    })
    .catch(function(error) {
      
      console.error('oops, something went wrong!', error);
    });
  }
}
