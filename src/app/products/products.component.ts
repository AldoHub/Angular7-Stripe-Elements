import { Component, OnInit } from '@angular/core';
import {FetchProductsService} from "../fetch-products.service";



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: FetchProductsService) { }

  public products:any[] = [];

  getProducts(){
    this.productsService.getAllProducts().subscribe(products => {
      this.products = products["data"];
    
    });
  }


  ngOnInit() {
    this.getProducts();
  }

}
