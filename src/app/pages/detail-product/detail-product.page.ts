import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductListService } from 'src/app/services/product-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailProductPage implements OnInit {
  productes: any[]=[];
  productId: string | null = null;
  nom: string = "";
  desc: string = "";
  price: number = 0;


  constructor(private storage: Storage, private router: Router, private route: ActivatedRoute, public apiService: ProductListService){ 
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    this.getIdFromUrl();
    this.getProductById();
  }

  getIdFromUrl() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  getProductById() {
    this.apiService.getProduct(this.productId).subscribe((response : any) => {
      response.products.forEach((product: any) => {
				this.nom = response.products[0].name;
        this.desc = response.products[0].description.replaceAll('<p>', '').replaceAll('</p>', '');
        this.price = response.products[0].price;
			});
      console.log(response);
    })
  }  


  addToCart() {
    const producto = {
      nombre: this.nom,
      cantidad: 1,
      precio: this.price,
      imagen: 'assets/Pink.png'
    };
    this.storage.get('carrito').then((productosEnCarrito: any[]) => {
      if (productosEnCarrito) {
        const index = productosEnCarrito.findIndex((p) => p.nombre === producto.nombre);
  
        if (index !== -1) {
          productosEnCarrito[index].cantidad += 1;
        } else {
          productosEnCarrito.push(producto);
        }
  
        this.storage.set('carrito', productosEnCarrito).then(() => {
          console.log('Producto añadido al carrito');
          this.router.navigate(['/tabs/tab3']);
        });
      } else {
        const nuevoCarrito = [producto];
  
        this.storage.set('carrito', nuevoCarrito).then(() => {
          console.log('Producto añadido al carrito');
          this.router.navigate(['/tabs/tab3']);
        });
      }
    });
  }
  
}