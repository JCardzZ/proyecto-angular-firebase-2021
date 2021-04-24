import { Component, OnInit } from '@angular/core';
import { Path } from '../../config';
import { CategoriesService } from '../../services/categories.service';
import { SubCategoriesService } from '../../services/sub-categories.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  path: String = Path.url;
  categories: Object = null;
  render: Boolean = true;
  categoriesList: Array<any> = [];



  constructor(private categoriesService: CategoriesService,  private subCategoriesService: SubCategoriesService) { }

  ngOnInit(): void {

  /*======================================
    Tomamos  la data de las categorias
    ========================================*/

    this.categoriesService.getData()
    .subscribe(resp => {

      this.categories = resp;

      let i;

      for (i in resp) {
        /*======================================
    Separamos los nombre de categorias
    ========================================*/

        this.categoriesList.push(resp[i].name);
      }
    })
  }
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
                url: resp[i].url
              });
            }
       /*=====================================================================================
   Recorremos el array de objetos nuevo para buscar coincidencias con los nombres de categorias
   =======================================================================================*/

   for(i in arraySubCategories){

    if(category == arraySubCategories[i].category){


      $(`[category-footer='${category}']`).after(

        `
        <a href="products/${arraySubCategories[i].url}">${arraySubCategories[i].subcategory}</a>
        `
      )

    }
   }

          });
      });
    }
  }
}
