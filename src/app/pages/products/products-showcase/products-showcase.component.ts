import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.css']
})
export class ProductsShowcaseComponent implements OnInit {
  path: String = Path.url;
  products: Array<any> = [];


  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    /*======================================
 Capturamos el parámetro URL
 ========================================*/

    let params = this.activatedRoute.snapshot.params["param"];

    this.productsService.getFilterData("category", params)
      .subscribe(resp1 => {


        if (Object.keys(resp1).length > 0) {

          let i;
          for (i in resp1) {
            this.productsFnc(resp1);

          }
        } else {


          /*================================================================
                  Filtramos data de las Subcategorias
             =================================================================*/
          this.productsService.getFilterData("sub_category", params)
            .subscribe(resp2 => {

              let i;
              for (i in resp2) {

                this.productsFnc(resp2);
              }

            })

        }
      })


  }





  /*================================================================
        Declaramos función para las mostrar los productos recomendados
     =================================================================*/

  productsFnc(response) {
    this.products = [];

    /*================================================================
            Hacemos un recorrido por la respuesta que nos traiga el filtrado
       =================================================================*/

       let i;
       let getProducts = [];

       for (i in response) {
        getProducts.push(response[i]);

       }
    /*================================================================
            Filtramos solo hasta 6 productos
       =================================================================*/

       getProducts.forEach((product, index) => {

        if(index  < 6){
          this.products.push(product);

        }

      })


  }



}
