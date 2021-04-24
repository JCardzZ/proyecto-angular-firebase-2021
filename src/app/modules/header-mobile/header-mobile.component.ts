import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';

declare var jQuery: any;
declare var $: any;

import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css'],
})
export class HeaderMobileComponent implements OnInit {
  path: String = Path.url;
  categories: Object = null;
  render: Boolean = true;
  categoriesList: Array<any> = [];

  constructor(
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService
  ) {}

  ngOnInit(): void {
    /*======================================
    Tomamos  la data de las categorias
    ========================================*/

    this.categoriesService.getData().subscribe((resp) => {
      this.categories = resp;

      /*======================================
    Recorrido por el objeto de la data de categorias
    ========================================*/

      let i;

      for (i in resp) {
        /*======================================
    Separamos los nombre de categorias
    ========================================*/

        this.categoriesList.push(resp[i].name);
      }

      //   console.log('this.categories', this.categories);
    });

    /*======================================
   Activamos el efecto toogle en el listado  de subcategorias
    ========================================*/
    $(document).on('click', '.sub-toggle', function () {
      $(this).parent().children('ul').toggle();
    });
  }

  /*======================================
   Función que nos avisa cuando finaliza el renderizado de Angular
    ========================================*/
  callback() {
    if (this.render) {
      this.render = false;
      let arraySubCategories = [];

      /*======================================
        Separar las categorias
   ========================================*/
      this.categoriesList.forEach((category) => {
        /*=====================================================================================
   Tomamos la coleccion de las sub-categorias filtrando con los nombres de las categorias
   =======================================================================================*/

        this.subCategoriesService
          .getFilterData('category', category)
          .subscribe((resp) => {
            /*========================================================================================================================
   Hacemos un recorrido por la colección general de subcategorias y clasificamos de acuerdo a la categoria que correspondan
   =========================================================================================================================*/

            let i;

            for (i in resp) {
              arraySubCategories.push({
                category: resp[i].category,
                subcategory: resp[i].name,
                url: resp[i].url,
              });
            }
       /*=====================================================================================
   Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorias
   =======================================================================================*/

   for(i in arraySubCategories){

    if(category == arraySubCategories[i].category){


      $(`[category='${category}']`).append(

        `<li class="current-menu-item ">
        <a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
        </li>`
      )

    }
   }

          });
      });
    }
  }
}
