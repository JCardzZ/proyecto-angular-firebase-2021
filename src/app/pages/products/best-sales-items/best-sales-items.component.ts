import { Component, OnInit } from '@angular/core';
import { OwlCarouselConfig,
  CarouselNavigation,
  Rating,
  DinamicRating,
  DinamicReviews,
  DinamicPrice } from '../../../funtions.js';
import { Path } from '../../../config';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute } from '@angular/router';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-best-sales-items',
  templateUrl: './best-sales-items.component.html',
  styleUrls: ['./best-sales-items.component.css']
})
export class BestSalesItemsComponent implements OnInit {

  path: String = Path.url;
  bestSalesItem: Array<any> = [];
  render: Boolean = true;
  rating: Array<any> = [];
  reviews: Array<any> = [];
  price: Array<any> = [];
  cargando: Boolean = false;
  params: string = null;



  constructor(private productsService: ProductsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargando = true;
    /*======================================
 Capturamos el parámetro URL
 ========================================*/

 this.params = this.activatedRoute.snapshot.params["param"].split("&")[0];

    /*======================================
    Filtramos data de prouctos con categorías
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
          this.productsService.getFilterData("sub_category",this.params)
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

    this.bestSalesItem = [];

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
      return (b.sales - a.sales)
    })

    /*================================================================
     Filtramos solo hasta 10 productos
=================================================================*/

    getSales.forEach((product, index) => {

      if (index < 10) {
        this.bestSalesItem.push(product);
        this.rating.push(DinamicRating.fnc(this.bestSalesItem[index]));
        this.reviews.push(DinamicReviews.fnc(this.rating[index]));
        this.price.push(DinamicPrice.fnc(this.bestSalesItem[index]));

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
