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
    hiringDate: null,
  };

  sellerForm: FormGroup;
  addsellerForm: FormGroup;
  _id: string = '';
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';
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
    });

    this.addsellerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      hiringDate: ['', Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],


    });
  }

  ngOnInit() {
    this.service.getSellers().subscribe(vendeurs => {
      this.arrSellers = vendeurs;
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
