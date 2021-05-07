import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import {
  Rating,
  DinamicRating,
  DinamicReviews,
  DinamicPrice
} from '../../../funtions.js';

@Component({
  selector: 'app-products-showcase',
  templateUrl: './products-showcase.component.html',
  styleUrls: ['./products-showcase.component.css']
})
export class ProductsShowcaseComponent implements OnInit {
  path: String = Path.url;
  products: Array<any> = [];
  render: Boolean = true;
  cargando: Boolean = false;
  rating: Array<any> = [];
  reviews: Array<any> = [];
  price: Array<any> = [];



  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargando = true;

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

      if (index < 6) {
        this.products.push(product);
        this.rating.push(DinamicRating.fnc(this.products[index]));
        this.reviews.push(DinamicReviews.fnc(this.rating[index]));
        this.price.push(DinamicPrice.fnc(this.products[index]))
        this.cargando = false;


      }

    })


  }

  /*=============================================
    Función que nos avisa cuando finaliza el renderizado de Angular
    =============================================*/
  callback() {
    if (this.render) {
      this.render = false;
      Rating.fnc();
    }
  }


}
