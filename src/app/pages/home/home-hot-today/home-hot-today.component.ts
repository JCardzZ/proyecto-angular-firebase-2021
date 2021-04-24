import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';
import { OwlCarouselConfig, CarouselNavigation, SlickConfig, ProductLightbox, CountDown, Rating, ProgressBar } from '../../../funtions';
import { ProductsService } from '../../../services/products.service';
import { SalesService } from '../../../services/sales.service';


declare var jQuery: any;
declare var $: any;



@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {

  path: String = Path.url;
  indexes: Array<any> = [];
  products: Array<any> = [];
  render: Boolean = true;
  cargando: Boolean = false;

  constructor(private productsService: ProductsService, private salesService: SalesService) { }

  ngOnInit(): void {

    this.cargando = true;
    let getProducts = [];
    let hoy = new Date();
    let fechaOferta = null;

    /*=================================================
      Tomar la longitud del objeto
    ==================================================*/

    this.productsService.getData()
      .subscribe(resp => {

        /*============================================================
       Recorremos cada producto para separar las ofertas y el stock
     =================================================================*/

        let i;

        for (i in resp) {

          getProducts.push({
            "offer": JSON.parse(resp[i].offer),
            "stock": resp[i].stock

          })
          this.products.push(resp[i]);
          this.cargando = false;

        }
        /*===================================================================================================
       Recorremos cada oferta y stock para cñasificar las ofertas actuales y los productos que si tengan stock
     =========================================================================================================*/


        for (i in getProducts) {

          fechaOferta = new Date(

            parseInt(getProducts[i]["offer"][2].split("-")[0]),
            parseInt(getProducts[i]["offer"][2].split("-")[1]) - 1,
            parseInt(getProducts[i]["offer"][2].split("-")[2])

          )
          // console.log("fechaOferta", fechaOferta );
          //console.log("hoy", hoy);

          if (hoy < fechaOferta && getProducts[i]["stock"] > 0) {

            this.indexes.push(i);
            //  console.log("indexes", this.indexes);



          }


        }

      })

    /*=================================
    Tomamos la data de las ventas
    ====================================*/

    let getSales = [];

    this.salesService.getData()
      .subscribe(resp => {
        //   console.log("resp", resp);

        /*===================================================================
       Recorremos cada venta separar los productos y las cantidades
       ======================================================================*/

        let i;

        for (i in resp) {

          getSales.push({
            "product": resp[i].product,
            "quantity": resp[i].quantity,

          })

        }

        /*===================================================================
      Ordenamos de mayor a menor el arrelo de objetos
      ======================================================================*/

        getSales.sort(function (a, b) {
          return (b.quantity - a.quantity);
        })

        /*===================================================================
          Sacamos del arreglo los productos repetidos dejando los de mayor venta
        ======================================================================*/

        let filterSales = [];

        getSales.forEach(sale => {

          if (!filterSales.find(resp => resp.product == sale.product)) {

            const { product, quantity } = sale;

            filterSales.push({ product, quantity })


          }
        })

        /*===================================================================
          Filtramos la data de productos buscando coincidencias con las ventas
        ======================================================================*/

        filterSales.forEach((sale, index)=>{


        /*============================
          Filtramos hasta 20 ventas
        ==============================*/

        if(index < 20){

          this.productsService.getFilterData("name", sale.product)
            .subscribe(resp => {
              console.log("resp", resp);
            })

        }

        })



      })




  }
  /*================================================================
 Función que nos avisa cuando finaliza el renderizado de Angular
    =================================================================*/

  callback() {
    if (this.render) {

      this.render = false;


      /*================================================================
     Seleccionar del DOM los elementos de la reseña
        =================================================================*/

      let review_1 = $(".review_1");
      let review_2 = $(".review_2");
      let review_3 = $(".review_3");



      /*================================================================
   Seleccionar del DOM de los elementos de la oferta
  =================================================================*/

      let offer_1 = $(".offer_1");
      let offer_2 = $(".offer_2");
      let offer_3 = $(".offer_3");


      /*================================================================
     Seleccionar del DOM los elementos de la galeria mixta
        =================================================================*/

      let galleryMix_1 = $(".galleryMix_1");
      let galleryMix_2 = $(".galleryMix_2");
      let galleryMix_3 = $(".galleryMix_3");


      /*================================================================
     Recorremos todos los índices de productos
        =================================================================*/

      for (let i = 0; i < galleryMix_1.length; i++) {



        /*================================================================
         Recorremos todos los índices de productos
        =================================================================*/
        for (let f = 0; f < JSON.parse($(galleryMix_1[i]).attr("gallery")).length; f++) {




          /*================================================================
           Agreagr imágenes grandes
          =================================================================*/

          $(galleryMix_2[i]).append(
            `<div class="item">
            <a href="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
                <img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
            </a>
        </div>`


          )

          /*================================================================
             Agreagr imágenes pequeñas
            =================================================================*/

          $(galleryMix_3[i]).append(
            `<div class="item">
   <img src="assets/img/products/${$(galleryMix_1[i]).attr("category")}/gallery/${JSON.parse($(galleryMix_1[i]).attr("gallery"))[f]}">
</div>`
          )

        }

        /*================================================================
       Capturamos el array de las ofertas de cada producto
      =================================================================*/


        let offer = JSON.parse($(offer_1[i]).attr("offer"));
        //  console.log("offer", offer[0]);


        /*================================================================
        Capturamos el precio de cada producto
       =================================================================*/

        let price = Number($(offer_1[i]).attr("price"));


        /*================================================================
        Preguntamos el descuento
       =================================================================*/

        if (offer[0] == "Disccount") {

          $(offer_1[i]).html(

            `<span>Save <br> $${(price * offer[1] / 100).toFixed(2)}</span>`

          )

          $(offer_2[i]).html(`$${(price - (price * offer[1] / 100)).toFixed(2)}`)

        }


        /*================================================================
        Preguntamos si el precio ea fijo
       =================================================================*/
        if (offer[0] == "Fixed") {

          $(offer_1[i]).html(


            // `<span>Save <br> $${(price-offer[1]).toFixed(2)}</span>`
            `<span>Save <br> $${(price - offer[1]).toFixed(2)}</span>`
          )

          $(offer_2[i]).html(`$${offer[1]}`)

        }

        /*================================================================
      Agregamos la fecha al descontador
     =================================================================*/
        $(offer_3[i]).attr("data-time",
          new Date(

            parseInt(offer[2].split("-")[0]),
            parseInt(offer[2].split("-")[1]) - 1,
            parseInt(offer[2].split("-")[2])

          )

        )
        /*================================================================
           Calculamos el total de las calificaciones de los reviews
          =================================================================*/

        let totalReview = 0;

        for (let f = 0; f < JSON.parse($(review_1[i]).attr("reviews")).length; f++) {

          totalReview += Number(JSON.parse($(review_1[i]).attr("reviews"))[f]["review"])

        }
        /*================================================================
         Imprimimos el total de las calificaciones para cada producto
        =================================================================*/

        let rating = Math.round(totalReview / JSON.parse($(review_1[i]).attr("reviews")).length);

        $(review_3[i]).html(rating);

        for (let f = 1; f <= 5; f++) {


          $(review_2[i]).append(
            `<option value="2">${f}</option`
          )

          if (rating == f) {
            $(review_2[i]).children('option').val(1)
          }

        }

      }
      OwlCarouselConfig.fnc();
      CarouselNavigation.fnc();
      SlickConfig.fnc();
      ProductLightbox.fnc();


      /*================================================================
       Ejecutamos funciones globales con respecto a las ofertas
      =================================================================*/
      CountDown.fnc();

      /*================================================================
    Ejecutamos funciones globales con respecto a las reseñas
   =================================================================*/
      Rating.fnc();


      /*================================================================
      Ejecutamos funciones globales con respecto al stock
      =================================================================*/
      ProgressBar.fnc();

    }
  }

}

