import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';

declare var jQuery: any;
declare var $:any;

import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';




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

  constructor(private categoriesService: CategoriesService, private subCategoriesService: SubCategoriesService) { }

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

            for(i in resp){
              arraySubCategories.push({
                "category": resp[i].category,
                "subcategory": resp[i].name,
                "url": resp[i].url

              })
            }


        /*=============================================================================================
        Recorremos el array de objetso nuevo para buscar coincidencias con los nombres de las categorias
      =================================================================================================*/

      for(i in arraySubCategories){

        if (category.name == arraySubCategories[i].category){

          $(`[category-showcase='${category.name}']`).append(`
          
          <li><a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a></li>
          `)
        }
      }

          })

      })
    }
  }
}
