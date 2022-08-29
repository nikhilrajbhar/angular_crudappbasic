import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }
  postProduct(data: any) {
    console.log("data===");
    console.log(data);
    return this.http.post<any>("https://testingproduct.herokuapp.com/productList/",data);
  }
  getProduct() {
    return this.http.get<any>("https://testingproduct.herokuapp.com/productList/");
  }

  updateProduct(data:any,_id: number){
    return this.http.put<any>("https://testingproduct.herokuapp.com/productList/"+_id,data)
  }

  
  deleteProduct(_id: number){
    return this.http.delete<any>("https://testingproduct.herokuapp.com/productList/"+_id);
  }
}
