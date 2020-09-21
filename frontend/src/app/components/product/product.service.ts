import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'
import { MatButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import {Product} from './product-create/product.model'
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(private snakbar: MatSnackBar,private http: HttpClient)  { }

  ShowMessage(msg: string, isError: boolean = false): void {
    this.snakbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    } )
  }
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e) )
    );
  } 



  errorHandler(e: any) :Observable<any>{
      this.ShowMessage('Ocorreu um erro!', true);
      return EMPTY;
  }

  read():Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readById(id: number):Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e) )
    );
  }

  update(product:Product) : Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e) )
    );
  }

  delete(id:number) : Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e) )
    );
  }

}
