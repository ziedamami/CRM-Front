import { Component, OnInit } from '@angular/core';
import { SaleService } from 'app/services/sale.service';
import { SaleResponse } from 'app/model/SaleResponse';

@Component({
  selector: 'app-mysales',
  templateUrl: './mysales.component.html',
  styleUrls: ['./mysales.component.scss']
})
export class MysalesComponent implements OnInit {
  arrSaleBySellers: SaleResponse[] = [];
  constructor(private dataService: SaleService) {

    this.dataService.getAllSalesbySeller(sessionStorage.getItem('_id')).subscribe((salesbyseller)=>{
     

      this.arrSaleBySellers= salesbyseller.sort((a,b)=>a.dateOfSale>b.dateOfSale ? -1 : a.dateOfSale<b.dateOfSale ? 1 :0);

      console.log(this.arrSaleBySellers.length)
  
    })

   }

  ngOnInit() {

  }

}
