import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { SaleService } from '../services/sale.service'
import { SaleResponse } from '../model/SaleResponse';
import { SellerService } from '../services/seller.service';
import { SellerResponse } from '../model/SellerResponse';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statSeller=new Array();
 arrSalesSeller:SaleResponse[];
  arrSales: SaleResponse[]; 
  arrSeller : SellerResponse[];
  SellerNumber:number;
  total : number;
  TotalAmount:number=0;
  dayBeforeTotalAmount:number=0;
  twodaysBeforeTotalAmount:number=0;
  threedaysBeforeTotalAmount:number=0;
  fourdaysBeforeTotalAmount:number=0;
  fivedaysBeforeTotalAmount:number=0;
  sixdaysBeforeTotalAmount:number=0;
  TodaySales : number=0;
  dayBeforeSales :number=0;
  twoDaysBeforeSales :number=0;
  threeDaysBeforeSales :number=0;
  fourBeforeSales :number=0;
  fiveDaysBeforeSales :number=0;
  sixDaysBeforeSales :number=0;
  numberOfSalesPerSeller:number=0;
  numberOfSalesPerSellertoday:number=0;
  totalAmnoutperSeller : number=0;
  num:number=0;









  constructor(private dataService: SaleService,private sellerService: SellerService) { }
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
   
    console.log(typeof(this.twodaysBeforeTotalAmount));
      this.dataService.getAllSales().subscribe((sale:any)=>{
        new Date();
        
        
        this.arrSales = sale;

        for(let d=0;d<this.arrSales.length;d++)
        {
          

        if(JSON.stringify(this.arrSales[d].dateOfSale).substr(6,6).replace('T','')===new Date().toJSON().substr(5,5))
        {
          this.TodaySales+=1;
         this.TotalAmount+=this.arrSales[d].amount
        
        }
        if(JSON.stringify(this.arrSales[d].dateOfSale).substr(6,6).replace('T','')===new Date(new Date().getTime()-(24*60*60*1000)).toJSON().substr(5,5))
        {
          this.dayBeforeSales+=1;
         this.dayBeforeTotalAmount+=this.arrSales[d].amount
        
        }
        if(JSON.stringify(this.arrSales[d].dateOfSale).substr(6,6).replace('T','')===new Date(new Date().getTime()-(2*24*60*60*1000)).toJSON().substr(5,5))
        {
          this.twoDaysBeforeSales+=1;
         this.twodaysBeforeTotalAmount+=this.arrSales[d].amount
        
        }
        if(JSON.stringify(this.arrSales[d].dateOfSale).substr(6,6).replace('T','')===new Date(new Date().getTime()-(3*24*60*60*1000)).toJSON().substr(5,5))
        {
          this.threeDaysBeforeSales+=1;
         this.threedaysBeforeTotalAmount+=this.arrSales[d].amount
        
        }
        if(JSON.stringify(this.arrSales[d].dateOfSale).substr(6,6).replace('T','')===new Date(new Date().getTime()-(4*24*60*60*1000)).toJSON().substr(5,5))
        {
          this.fourBeforeSales+=1;
         this.fourdaysBeforeTotalAmount+=this.arrSales[d].amount
        
        }
        if(JSON.stringify(this.arrSales[d].dateOfSale).substr(6,6).replace('T','')===new Date(new Date().getTime()-(5*24*60*60*1000)).toJSON().substr(5,5))
        {
          this.fiveDaysBeforeSales+=1;
         this.fivedaysBeforeTotalAmount+=this.arrSales[d].amount
        
        }
        if(JSON.stringify(this.arrSales[d].dateOfSale).substr(6,6).replace('T','')===new Date(new Date().getTime()-(6*24*60*60*1000)).toJSON().substr(5,5))
        {
          this.sixDaysBeforeSales+=1;
         this.sixdaysBeforeTotalAmount+=this.arrSales[d].amount
        
        }

              /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

            this.total=this.sixdaysBeforeTotalAmount+this.fivedaysBeforeTotalAmount+this.fourdaysBeforeTotalAmount+this.threedaysBeforeTotalAmount+this.twodaysBeforeTotalAmount+this.dayBeforeTotalAmount+this.TotalAmount;
            console.log(this.total);
        const dataDailySalesChart: any = {
          labels: [
            new Date(new Date().getTime()-(6*24*60*60*1000)).toJSON().substr(5,5),
            new Date(new Date().getTime()-(5*24*60*60*1000)).toJSON().substr(5,5),
            new Date(new Date().getTime()-(4*24*60*60*1000)).toJSON().substr(5,5),
            new Date(new Date().getTime()-(3*24*60*60*1000)).toJSON().substr(5,5),
            new Date(new Date().getTime()-(2*24*60*60*1000)).toJSON().substr(5,5),
            new Date(new Date().getTime()-(24*60*60*1000)).toJSON().substr(5,5),
            new Date().toJSON().substr(5,5)

             ],
             series:[
              [
                this.sixDaysBeforeSales,
                this.fiveDaysBeforeSales,
                this.fourBeforeSales,
                this.threeDaysBeforeSales,
                this.twoDaysBeforeSales,
                this.dayBeforeSales,
                this.TodaySales,
                
              ]

             ]

          
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: this.arrSales.length, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);
      /* ----------==========     Daily revenue Subscription Chart initialization    ==========---------- */


      var datawebsiteViewsChart = {
        labels: [
          new Date(new Date().getTime()-(6*24*60*60*1000)).toJSON().substr(5,5),
          new Date(new Date().getTime()-(5*24*60*60*1000)).toJSON().substr(5,5),
          new Date(new Date().getTime()-(4*24*60*60*1000)).toJSON().substr(5,5),
          new Date(new Date().getTime()-(3*24*60*60*1000)).toJSON().substr(5,5),
          new Date(new Date().getTime()-(2*24*60*60*1000)).toJSON().substr(5,5),
          new Date(new Date().getTime()-(24*60*60*1000)).toJSON().substr(5,5),
          new Date().toJSON().substr(5,5)
        ],
        series: [
          [
            this.sixdaysBeforeTotalAmount,
                this.fivedaysBeforeTotalAmount,
                this.fourdaysBeforeTotalAmount,
                this.threedaysBeforeTotalAmount,
                this.twodaysBeforeTotalAmount,
                this.dayBeforeTotalAmount,
                this.TotalAmount,
          ]

        ]
      };
      var optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 4000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);

    
        }
        
       
      })
     
      
     
      


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);

      this.sellerService.getSellers().subscribe((seller:any)=>{
        this.arrSeller = seller.filter(vendeur=>vendeur.role=='vendeur');
        this.SellerNumber=this.arrSeller.length

        for(let s=0;s<this.arrSeller.length;s++)
        {
          let totalAmnoutperSeller=0;

          this.dataService.getAllSalesbySeller(this.arrSeller[s]._id).subscribe((stat:any)=>{
            this.arrSalesSeller=stat;
            this.numberOfSalesPerSeller=this.arrSalesSeller.length
            for(let k=0;k<this.arrSalesSeller.length;k++)
            totalAmnoutperSeller+=this.arrSalesSeller[k].amount
            this.statSeller=[...this.statSeller,{num:s+1,firstname:this.arrSeller[s].firstName,
              lastname:this.arrSeller[s].lastName,
              amount:totalAmnoutperSeller,number:this.numberOfSalesPerSeller}].sort(
                (s1,s2)=>s1.number<s2.number ? 1: -1 
              )

                   /* ----------==========      todays sales Chart initialization    ==========---------- */
            
        
          })
        }
      })

      
  }


  
}
  


