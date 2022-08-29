import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"; 

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  freshnessList=["Brand New","Second Hand","Refurbished"]
  productform !: FormGroup;
  actionBtn : String = "Save";

  constructor(private formbuilder : FormBuilder,private api : ApiService, private dailogRef : MatDialogRef<AddproductComponent>, @Inject(MAT_DIALOG_DATA) public editData : any) { }

  ngOnInit(): void {
    this.productform = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })

    console.log(this.editData);

    if (this.editData){
      this.actionBtn = "Update"
      this.productform.controls["productName"].setValue(this.editData.productName);
      this.productform.controls["category"].setValue(this.editData.category);
      this.productform.controls["freshness"].setValue(this.editData.freshness);
      this.productform.controls["price"].setValue(this.editData.price);
      this.productform.controls["comment"].setValue(this.editData.comment);
      this.productform.controls["date"].setValue(this.editData.date);
      
    }
    
  }

  addProduct(){
    if(this.productform.valid){
       this.api.postProduct(this.productform.value)
       .subscribe({
         next:(res)=>{
           alert("Product added successfully")
           this.productform.reset();
           this.dailogRef.close("save");
         },
         error:()=>{
           alert("error while adding product")
         }
    })
     }
    }

    updateProduct(){
      console.log("updating product");
      this.api.updateProduct(this.productform.value, this.editData._id)
      .subscribe({
        next:(res)=>{
          alert("Product updated successfully")
          this.productform.reset();
          this.dailogRef.close("Updated");
        },
        error:()=>{
          alert("error while Updating product")
        }
   })
    }
    addEditProduct(){
      if (!this.editData) this.addProduct();
      else this.updateProduct(); 
    }
}
