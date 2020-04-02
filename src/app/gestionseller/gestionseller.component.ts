import { Component, OnInit } from '@angular/core';
import { SellerResponse } from '../model/SellerResponse';
import { SellerService } from '../services/seller.service';
import { ModalService } from '../_modal';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestionseller',
  templateUrl: './gestionseller.component.html',
  styleUrls: ['./gestionseller.component.scss'],
  providers: [DatePipe]

})
export class GestionsellerComponent implements OnInit {
  arrSellers: SellerResponse[] = [];
  seller: SellerResponse = {
    _id: '', firstName: '', lastName: '', username: '', password: '',
    hiringDate: null, address:' ', email: '', geographicalArea: '',phoneNumber: '',role:''
  };

  sellerForm: FormGroup;
  addsellerForm: FormGroup;
  _id: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';
  email:string='';
  hiringDate: Date = null;


  submitted = false;
  success = false;

  constructor(private service: SellerService, private modalService: ModalService,
    private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.sellerForm = new FormGroup({
      firstName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      lastName: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      hiringDate: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      username: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      password: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      email: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      phoneNumber: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      address: new FormControl({ value: '' }, Validators.compose([Validators.required])),
      geographicalArea: new FormControl({ value: '' }, Validators.compose([Validators.required])),
    });

    this.addsellerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      hiringDate: ['', Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      address: ['',Validators.required],
      geographicalArea: ['',Validators.required],
     


    });
  }

  ngOnInit() {
    this.service.getSellers().subscribe(vendeurs => {
      this.arrSellers = vendeurs.filter(vendeur=>vendeur.role=='vendeur');
    })
  }

  getSellerDetails(id) {
    this.service.getSeller(id)
      .subscribe(data => {
        this.seller = data;
        this._id = data._id;
        this.sellerForm.get('firstName').setValue(this.seller.firstName);
        this.sellerForm.get('lastName').setValue(this.seller.lastName);
        this.sellerForm.get('hiringDate').setValue(this.datePipe.transform(this.seller.hiringDate, "yyyy-MM-dd"));
        this.sellerForm.get('username').setValue(this.seller.username);
        this.sellerForm.get('email').setValue(this.seller.email);
        this.sellerForm.get('phoneNumber').setValue(this.seller.phoneNumber);
        this.sellerForm.get('geographicalArea').setValue(this.seller.geographicalArea);
        this.sellerForm.get('address').setValue(this.seller.address);




        console.log(this.seller);
      });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    if (this.sellerForm.invalid) {
      return;
    }
    this.success = true;

    this.service.updateSeller(this._id, form)
      .subscribe(res => {
        location.reload();

      }, (err) => {
        console.log(err);
      }
      );
  }

  onaddFormSubmit(form: NgForm) {
    this.submitted = true;
    if (this.addsellerForm.invalid) {
      return;
    }
    this.success = true;

    this.service.addSeller(form)
      .subscribe(res => {
      location.reload();
        console.log(form)
      }, (err) => {
        console.log(err);
      }
      );
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  delete(id) {
    if (confirm("Etes vous sûr de vouloir le supprimer?")) {
      this.service.deleteSeller(id)
        .subscribe(res => {
          location.reload();
        }, (err) => {
          console.log(err);
        }
        );
    }
  }


}
