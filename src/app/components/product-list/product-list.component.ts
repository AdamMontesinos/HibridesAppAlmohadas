import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProductListService } from 'src/app/services/product-list.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProductListComponent  implements OnInit {
  productes: any[]=[];
  productId: string | null = null;

  constructor(public apiService: ProductListService, private router: Router) { }

  ngOnInit() { 
    this.getProductById();
  }

  getProductById() {
    this.apiService.getProducts().subscribe((response : any) => {
      response.products.forEach((product: any) => {
				this.productes.push(
					{
            id: product.id,
						nom: product.name,
						img: `https://marcariza.cat/api/images/products/${product.id}/${product.id_default_image}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`,
					});
			});
      //console.log(response);
    })
  }

  navigateToDetail(productId: number) {
    this.router.navigate(['/detail-product', productId]);
  }  

}