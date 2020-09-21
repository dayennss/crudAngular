import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {ProductService} from './../product.service'
import {Product} from './product.model'
import { HeaderService } from '../../template/header/header.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(private productService:ProductService, private router:Router, headerService : HeaderService) {
    headerService.headerData.title = "Criar novo produto";
    headerService.headerData.icon = "create";
    headerService.headerData.routerUrl = "/products";
   }

  ngOnInit(): void {
    
  }

  createProduct():void  {
    this.productService.create(this.product).subscribe(() => {
      this.productService.ShowMessage("Produto criado com sucesso!");
      this.router.navigate(['/products'])
    })
    
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
