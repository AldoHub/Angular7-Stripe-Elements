import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class FetchProductsService {


  constructor(private httpclient: HttpClient) { }

  getAllProducts(){
    return this.httpclient.get("http://localhost:8000/");
  }


}
