import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import {
  Rating,
  DinamicRating,
  DinamicReviews,
  DinamicPrice,
  Pagination
} from '../../../funtions.js';
import { updateFor } from 'typescript';

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
  params: string = null;
  page;
  productFound:Number = 0;
  currentRoute:string = null;
  totalPage:Number = 0;




  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargando = true;

    /*======================================
 Capturamos el parámetro URL
 ========================================*/

    this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];
    this.page = this.activatedRoute.snapshot.params["param"].split("&")[1];


    this.currentRoute = `products/${this.params}`;

  /*======================================
 Filtramos la data de los productos con categorías
 ========================================*/

    this.productsService.getFilterData("category", this.params)
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
          this.productsService.getFilterData("sub_category", this.params)
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
    let total=0;

    for (i in response) {
      total++;;
      getProducts.push(response[i]);

    }
    /*================================================================
      Definimos el total de productos y la paginación de productos
    =================================================================*/

    this.productFound = total;
    this.totalPage = Math.ceil(Number(this.productFound)/6);




    getProducts.forEach((product, index) => {

      /*================================================================
          Evaluamos si viene número de página definida
   =================================================================*/

      if (this.page == undefined) {
        this.page = 1;
      }


      /*================================================================
            Configuramos la paginación desde - hasta
     =================================================================*/

      let first = Number(index) + (this.page * 6) - 6;
      let last = 6 * this.page;


      if (first < last) {

        if (getProducts[first] != undefined) {
          this.products.push(getProducts[first]);
          this.rating.push(DinamicRating.fnc(getProducts[first]));
          this.reviews.push(DinamicReviews.fnc(getProducts[first]));
          this.price.push(DinamicPrice.fnc(getProducts[first]))
          this.cargando = false;

        }


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
      Pagination.fnc();
    }
  }


}
