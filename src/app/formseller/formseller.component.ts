import { Component, OnInit,Pipe, PipeTransform} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { SaleService } from 'app/services/sale.service';
import { ScriptService } from 'app/script.service';
import { Bill, SaleResponse } from 'app/model/SaleResponse';
import { ModalService } from '../_modal';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
//declare let pdfMake: any ;


@Pipe({name: 'round'})
export class RoundPipe implements PipeTransform  {
  transform (input:number) {
    return Math.round(input*2)/2;
  }
}

@Component({
  selector: 'app-formseller',
  templateUrl: './formseller.component.html',
  styleUrls: ['./formseller.component.scss']
})
export class FormsellerComponent implements OnInit {
  saleFormGroup: FormGroup;
  submitted = false;
  success = false;

  bill = new Bill();
  logo :string = '';
  type:string='';
  typeofPackage:string='';


  constructor(private saleservice: SaleService,private formBuilder: FormBuilder,private scriptService: ScriptService,
    private modalService: ModalService,) { 
    this.saleFormGroup = this.formBuilder.group({
      typeofPackage: ['', Validators.required],
      departurePackage: ['', Validators.required],
      destinationPackage: ['', Validators.required],
      quantity: ['',Validators.required],
      weight: ['',Validators.required],
      length: ['',Validators.required],
      width: ['',Validators.required],
      height: ['',Validators.required],
      amount:['0',],
      positionCity: ['', Validators.required],
      DepartPort: ['', Validators.required],
      DepartTown: ['', Validators.required],
      DelevryPort: ['', Validators.required],
      DestionationTown: ['', Validators.required],
      danger: ['', Validators.required],
      mandate: ['', Validators.required],
      incoterm :['', Validators.required],
      seller : sessionStorage.getItem('_id'),
     // geographicalArea: ['',Validators.required],
     


    });

    pdfMake.vfs = pdfFonts.pdfMake.vfs;


    this.bill = JSON.parse(sessionStorage.getItem('bill')) || new Bill();
    if (!this.bill.sales || this.bill.sales.length === 0) {
      this.bill.sales = [];
      this.bill.sales.push(new SaleResponse());
    }
    

    console.log('Loading External Scripts');
    this.scriptService.load('pdfMake', 'vfsFonts');
  }

  ngOnInit() {
  }

  onaddSaleFormSubmit(form: NgForm) {
    this.submitted = true;
    if (this.saleFormGroup.invalid) {
      return;
    }
    this.success = true;

    this.saleservice.addSale(form)
      .subscribe(res => {
      location.reload();
        console.log(form)
      }, (err) => {
        console.log(err);
      }
      );
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  generateBookingReservation(action = 'open') {
    console.log(pdfMake);
    const BookingReservation = this.getBookingReservation();

    switch (action) {
      case 'open': pdfMake.createPdf(BookingReservation).open(); break;
      case 'print': pdfMake.createPdf(BookingReservation).print(); break;
      case 'download': pdfMake.createPdf(BookingReservation).download(); break;

      default: pdfMake.createPdf(BookingReservation).open(); break;
    }

  }

  async  uploadFiles() {
    try {
      let canvas = document.createElement('canvas');
      let img = document.createElement('img');
      img.src = "src/assets/img/IMG-20191216-WA0000.jpg";
      img.onload =  ()=> {
        canvas.height = img.height;
        canvas.width = img.width;
        let dataURL = canvas.toDataURL('image/png');
        console.log('>>><<<',dataURL);
       
        canvas = null; 
        this.bill.logo=dataURL;
      }
    }catch (e) {
      console.log('error while processing base64 conversion>>>', e) 
    }
  }

  getDocumentDefinition() {
    sessionStorage.setItem('bill', JSON.stringify(this.bill));
    return {
      content: [
        {
          text: 'SAS Les Oréades - Click2Ship \n ',
          bold: true,
          fontSize: 16,
          alignment: 'right',
          margin: [0, 0, 0, 0]
        },
        {
          text: 'n° TVA: TVA Intracommunautaire: FR45838038495 \n 5 avenue des chasseurs 75017 Paris \n Numero SIREN: 838038495 \n EORI: FR83803849500019 \n  commercial@les-oreades.eu          ',
          fontSize: 10 ,
          alignment: 'right',
          margin: [0, 0, 0, 0]
        },
        {
          columns: [
            [
              {
                text: '  \n  ',
                style: 'header'
              },
              
              
              {
              text: 'Mr Zied Amami',
              style: 'name'
            },
            {
              text: '10 rue du Rossignol'
            },
            {
              text: 'Email : zied.amami@esprit.tn' 
            },
            {
              text: 'Contant No : +216 53 10 77 88' ,
            },
           
            ],
            [
              {
                text: 'Facture FACT20190001',
                alignment: 'right',

              },
            ],
            [
              //this.getProfilePicObject()
            ]
            
          ]
        },
     /*  {
          text: 'Skills',
          style: 'header'
        },
        {
          columns : [
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },*/
        {
          text: '  \n  ',
          style: 'header'
        },
        {
          text: '  \n  ',
          style: 'header'
        },

        {
          text: 'Details',
          style: 'header'
        },
        this.getSales(this.bill.sales),

        ,
        {
          text: '  \n  ',
          style: 'header'
        },
        {
          text: 'Instructions de paiement ',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 0, 0, 0]
        },
        {
          text: '  \n  ',
          style: 'header'
        },
        {
          text: 'Virement bancaire ',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 0, 0, 0]
        },
        {
          text: 'Name: LES OREADES \n IBAN:FR7616798000010000091050044\n BIC: TRZOFR21XXX \n   ',
          fontSize: 10 ,
          alignment: 'left',
          margin: [0, 0, 0, 0]
        },
        {
          text: 'Autre ',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 0, 0, 0]
        },
        {
          text: 'Paiement comptant \n https://transferwise.com/fr/   ',
          fontSize: 10 ,
          alignment: 'left',
          margin: [0, 0, 0, 0]
        },

       /* {
          columns : [
              { qr: this.resume.name + ', Contact No : ' + this.resume.contactNo, fit : 100 },
              {
              text: `(${this.resume.name})`,
              alignment: 'right',
              }
          ]
        }
      */],
   /*   info: {
        title: this.resume.name + '_RESUME',
        author: this.resume.name,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }*/
    };
  }

 

  getSales(Sales: SaleResponse[]) {
    return {
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [{
            text: 'Quantite',
            style: 'tableHeader'
          },
          {
            text: 'Poids',
            style: 'tableHeader'
          },
          {
            text: 'Prix unitaire',
            style: 'tableHeader'
          },
          {
            text: 'Total',
            style: 'tableHeader'
          },
          ],
          ...Sales.map(sale=> {
            return [sale.quantity, sale.weight,4*(((Math.round(sale.weight*2)/2)-0.5)/0.5)+12 +' € ' ,sale.quantity*(4*(((Math.round(sale.weight*2)/2)-0.5)/0.5)+12)+' € ' ];
          })
        ]
      }
    };
  }
  
  getBookingReservation(){
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

}
