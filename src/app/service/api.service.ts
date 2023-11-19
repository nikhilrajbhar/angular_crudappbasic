import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  postProduct(data: product) {
    console.log("data===");
    console.log(data);
    return this.http.post<product>("https://producttesting.onrender.com/productList/",data);
  }
  getProduct() {
    return this.http.get<product[]>("https://producttesting.onrender.com/productList/");
  }

  updateProduct(data:product,_id: number){
    return this.http.put<product>("https://producttesting.onrender.com/productList/"+_id,data)
  }

  
  deleteProduct(_id: number){
    return this.http.delete<product>("https://producttesting.onrender.com/productList/"+_id);
  }
}
