import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import {
  OwlCarouselConfig,
  CarouselNavigation,
  Rating,
  DinamicRating,
  DinamicReviews,
  DinamicPrice
} from '../../../funtions.js';

@Component({
  selector: 'app-products-recomended',
  templateUrl: './products-recomended.component.html',
  styleUrls: ['./products-recomended.component.css']
})
export class ProductsRecomendedComponent implements OnInit {
  path: String = Path.url;
  recomendedItems: Array<any> = [];
  render: Boolean = true;
  rating: Array<any> = [];
  reviews: Array<any> = [];
  price: Array<any> = [];
  cargando: Boolean = false;


  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargando = true;

    /*======================================
 Capturamos el parámetro URL
 ========================================*/

    let params = this.activatedRoute.snapshot.params["param"];

    /*======================================
    Filtramos data de prouctos con categorías
    ========================================*/

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
          Declaramos función para mostrar las mejores ventas
     =================================================================*/
  productsFnc(response) {

    this.recomendedItems = [];

    /*================================================================
            Hacemos un recorrido por la respuesta que nos traiga el filtrado
       =================================================================*/

    let i;
    let getSales = [];

    for (i in response) {
      getSales.push(response[i]);

    }

    /*=============================================
        Ordenamos de mayor a menor ventas el arreglo de objetos
        =============================================*/

    getSales.sort(function (a, b) {
      return (b.views - a.views)
    })

    /*================================================================
     Filtramos solo hasta 10 productos
=================================================================*/

    getSales.forEach((product, index) => {

      if (index < 10) {
        this.recomendedItems.push(product);
        this.rating.push(DinamicRating.fnc(this.recomendedItems[index]));
        this.reviews.push(DinamicReviews.fnc(this.rating[index]));
        this.price.push(DinamicPrice.fnc(this.recomendedItems[index]));
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

      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      Rating.fnc();

    }

  }
}
