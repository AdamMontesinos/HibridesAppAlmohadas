import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule],
})
export class Tab3Page implements OnInit {
  productosEnCarrito: any[] = [];

  constructor(private route: ActivatedRoute, private storage: Storage, private router: Router) {}

  ngOnInit() {
    this.storage.create().then(() => {
      this.loadCartProducts();
    });
  }

  ionViewWillEnter() {
    this.loadCartProducts();
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  loadCartProducts() {
    this.storage.get('carrito').then((productos) => {
      if (productos) {
        this.productosEnCarrito = productos;
      } else {
        this.productosEnCarrito = [];
      }
    }).catch((error) => {
      console.error('Error al obtener los productos del carrito', error);
    });
  }

  decreaseQuantity(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad -= 1;
      this.updateCartProducts();
    }
  }

  increaseQuantity(producto: any) {
    producto.cantidad += 1;
    this.updateCartProducts();
  }

  getTotal(producto: any): number {
    return producto.cantidad * producto.precio;
  }

  getTotalCarrito(): number {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total += producto.cantidad * producto.precio;
    }
    return total;
  }

  removeProduct(producto: any) {
    const index = this.productosEnCarrito.indexOf(producto);
    if (index > -1) {
      this.productosEnCarrito.splice(index, 1);
      this.updateCartProducts();
    }
  }

  updateCartProducts() {
    this.storage.set('carrito', this.productosEnCarrito).then(() => {
      console.log('Productos del carrito actualizados');
    }).catch((error) => {
      console.error('Error al actualizar los productos del carrito', error);
    });
  }
}
