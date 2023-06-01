import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductListService } from '../services/product-list.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, ProductListComponent]
})
export class Tab2Page {
  productes: any;
  
  constructor(public apiService: ProductListService) {}

  ngOnInit() { 
   this.getData();
   console.log(this.productes);
  }
  getData(){
    this.apiService.getProducts().subscribe((response:any) => {
      this.productes = response.products;  
    });
  }
}
