import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ApiService } from './service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { product } from './data-type';

@Component({
  selector: 'app-roott',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todoapp';
  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource !: MatTableDataSource<product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) { }

  ngOnInit() {
    this.getAllProducts();
  }
  addProduct() {
    const dialogRef = this.dialog.open(AddproductComponent, {
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllProducts();
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (res) => {
        console.warn(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert("Error while data")
      }
    })
  }

  editProduct(row: any) {
    console.log("row calling");
    this.dialog.open(AddproductComponent,
      {
        width: "30%",
        data: row
      }).afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.getAllProducts();

      });
  }

  deleteProduct(row:any){
    console.log("row");
    console.log(row._id);
    this.api.deleteProduct(row._id).subscribe({
      next:(res)=>{
        console.log(res);
        this.getAllProducts();
        alert("product deleted");
      },
      error:(res)=> alert("Error while deleting product")
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
