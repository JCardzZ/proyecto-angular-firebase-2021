import { SubCategoriesService } from './../../services/sub-categories.service';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { Path } from '../../config';
import { Search } from  '../../funtions'

import { CategoriesService } from '../../services/categories.service';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  path: String = Path.url;
  categories: Object = null;
  arrayTitleList: Array<any> = [];
  render: Boolean = true;

  constructor(
    private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService
  ) { }

  ngOnInit(): void {
    /*======================================
    Tomamos  la data de las categorias
    ========================================*/

    this.categoriesService.getData().subscribe((resp) => {
      this.categories = resp;

      //  console.log("resp", resp);
      /*======================================
    Recorremos la colección de categorías para tomar la lista de titulos
    ========================================*/
      let i;

      for (i in resp) {
        //console.log("resp", resp[i].title_list);
        this.arrayTitleList.push(JSON.parse(resp[i].title_list));
        //  console.log('this.arrayTitleList', this.arrayTitleList);
      }
    });
  }

  /*======================================
    Declaramos función del buscador
========================================*/

  goSearch(search: string) {
    if (search.length == 0 || Search.fnc(search) == undefined) {
      return;
    }
    window.open(`search/${Search.fnc(search)}`, '_top')
  }


  /*======================================
    Función que nos avisa cuando finaliza el renderizado de Angular
========================================*/
  callback() {
    if (this.render) {
      this.render = false;
      let arraySubCategories = [];
      //   console.log("this.render", this.render);

      /*======================================
    Hacemos un recorrido por la lista de titulos
========================================*/
      this.arrayTitleList.forEach((titleList) => {
        /*======================================
    Separar individualmente los titulos
========================================*/

        //  console.log('titleList', titleList);


        for (let i = 0; i < titleList.length; i++) {


          /*============================================================================
   Tomamos la colección de las sub-categories filtrando con la lista de titulos
==============================================================================*/

          this.subCategoriesService
            .getFilterData('title_list', titleList[i])
            .subscribe((resp) => {
              arraySubCategories.push(resp);

              /*===========================================================
  Hacemos un recorrido por la coleccion general de subcategorias
================================================================*/

              let f;
              let g;
              let arrayTitleName = [];
              for (f in arraySubCategories) {
                /*===========================================================
  Hacemos un recorrido por la coleccion particular de subcategorias
================================================================*/

                for (g in arraySubCategories[f]) {
                  /*==============================================================================================
  Creamos un nuevo array de objetos clasificando cada sub-categoria con la respectiva lista de titulos
====================================================================================================*/

                  arrayTitleName.push({
                    titleList: arraySubCategories[f][g].title_list,
                    subcategory: arraySubCategories[f][g].name,
                    "url": arraySubCategories[f][g].url
                  });
                }

                //console.log("arraySubCategories", arraySubCategories[f]);
              }

              /*=======================================================================================
              Recorremos el array de objetos nuevo para buscar coincidencias con las listas de titulo
              =========================================================================================*/
              for (f in arrayTitleName) {

                if (titleList[i] == arrayTitleName[f].titleList) {

                  //console.log("arrayTitleName[f].subcategory", arrayTitleName[f].subcategory);
                  //console.log("titleList[i]", titleList[i]);

                  /*=======================================================================================
                  Imprimir el nombre de subcategoria debajo de el listado correspondiente
                  =========================================================================================*/

                  $(`[titleList='${titleList[i]}']`).append(

                    `<li>
                <a href="products/${arrayTitleName[f].url}">${arrayTitleName[f].subcategory}</a>
                </li>`
                  )

                }

              }

              //  console.log("arrayTitleName", arrayTitleName);

              //console.log('resp', resp);
            });

          //    console.log('titleList', titleList[1]);
        }

      });
    }
  }
}
