import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  //card options style

  @Input() price;
  @Input() product;
  @Input() description;

  cardOptions: ElementOptions = {
      style: {
        base: {
          iconColor: '#111',
          color: '#111',
          fontSize:"16px",
          '::placeholder': {
            color: '#111'
          }
        }
    }
  }

  //other optional options
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
 

  constructor(private stripeService: StripeService, private httpclient: HttpClient){}
    public paymentForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
   
    });

        
    buy(formdata: FormData){
    
     
      this.stripeService.createToken(this.card.getCard(), {name} )
      .subscribe(result => {
        
        if(result.token){
          const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');


          let obj = {
            token: result.token.id,
            email: formdata["email"],
            user: formdata["name"],
            amount: this.price,
            product: this.product,
            description: this.description

          }

          //make a call to the server
          this.httpclient.post("http://localhost:8000/charge",
          JSON.stringify(obj),
          {headers: headers} ).subscribe( data => {
            console.log("---- Transaction Data -----");
            //message from the API
            console.log(data);
          });
          
       
          console.log(result.token.id);
        }else if(result.error){
          console.log(result.error.message);
        }

      });



    }


  ngOnInit() {
  }

}
