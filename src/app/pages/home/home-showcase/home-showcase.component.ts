import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';

declare var jQuery: any;
declare var $: any;

import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';
import { ProductsService } from '../../../services/products.service';





@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css'],
})
export class HomeShowcaseComponent implements OnInit {
  path: String = Path.url;
  categories: Array<any> = [];
  cargando: Boolean = false;
  render: Boolean = true;

  constructor(private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {
    this.cargando = true;

    /*=================================
    Tomamos la data de las categorias
    ====================================*/

    let getCategories = [];

    this.categoriesService.getData().subscribe((resp) => {
      let i;

      for (i in resp) {
        getCategories.push(resp[i]);
      }

      /*=====================================================
    Ordenamos de mayor a menor vistas el arreglo de objetos
    =======================================================*/

      getCategories.sort(function (a, b) {
        return b.view - a.view;
      });

      /*=====================================================
    Filtramos hasta 6 categories
    =======================================================*/

      getCategories.forEach((category, index) => {
        if (index < 6) {
          this.categories[index] = getCategories[index];
          this.cargando = false;
        }
      });
    });
  }
  /*================================================================
    Función que nos avisa cuando finaliza el renderizado de Angular
    ===============================================================*/
  callback() {
    if (this.render) {

      this.render = false;

      let arraySubCategories = [];
      let arrayProducts = [];

      /*================================================================
    Separar las categorias
  ===============================================================*/
      this.categories.forEach(category => {


        /*==================================================================================
        Tomamos la colección de las sub-categorias filtrando con los nombres de las categorias
      =====================================================================================*/

        this.subCategoriesService.getFilterData("category", category.name)
          .subscribe(resp => {

            let i;

            for (i in resp) {
              arraySubCategories.push({
                "category": resp[i].category,
                "subcategory": resp[i].name,
                "url": resp[i].url

              })
            }


            /*=============================================================================================
            Recorremos el array de objetso nuevo para buscar coincidencias con los nombres de las categorias
          =================================================================================================*/

            for (i in arraySubCategories) {

              if (category.name == arraySubCategories[i].category) {

                $(`[category-showcase='${category.name}']`).append(`

          <li><a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a></li>
          `)
              }
            }

          })


        /*==================================================================================
        Tomamos la colección de los productos filtrando con las url's de categorias
      =====================================================================================*/

        this.productsService.getFilterDataWithLimit("category", category.url, 6)
          .subscribe(resp => {

            let i;

            for (i in resp) {
              arrayProducts.push({
                "category": resp[i].category,
                "url": resp[i].url,
                "name": resp[i].name,
                "image": resp[i].image,
                "price": resp[i].price,
                "offer": resp[i].reviews,
                "reviews": resp[i].category,
                "stock": resp[i].stock,
                "vertical_slider": resp[i].vertical_slider,


              })
            }

            /*======================================================================================
              Recorremos el array de objetos nuevo para buscar coincidencias con las url de categorias
            =========================================================================================*/

            for (i in arrayProducts) {

              if (category.url == arrayProducts[i].category) {

                $(`[category-pb='${arrayProducts[i].category}']`).append(


                `
                <div class="ps-product ps-product--simple">

                    <div class="ps-product__thumbnail">

                        <a href="product/${arrayProducts[i].url}">

                            <img src="assets/img/products/${arrayProducts[i].category}/${arrayProducts[i].image}" alt="">

                        </a>

                        <div class="ps-product__badge">-16%</div>

                    </div>

                    <div class="ps-product__container">

                        <div class="ps-product__content" data-mh="clothing">

                            <a class="ps-product__title" href="product/${arrayProducts[i].url}">${arrayProducts[i].name}</a>

                            <div class="ps-product__rating">

                                <select class="ps-rating" data-read-only="true">

                                    <option value="1">1</option>
                                    <option value="1">2</option>
                                    <option value="1">3</option>
                                    <option value="1">4</option>
                                    <option value="2">5</option>

                                </select>

                                <span>01</span>

                            </div>

                            <p class="ps-product__price sale">$567.99 <del>$670.00 </del></p>

                        </div>

                    </div>

                </div>

            </div>`
            )
              }
            }



          })


      })
    }
  }
}
