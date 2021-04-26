import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';




@Component({
  selector: 'app-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.css']
})
export class HomeTopCategoriesComponent implements OnInit {

  path: String = Path.url;
  categories: Array<any> = [];
  cargando: Boolean = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {

    this.cargando = true;

    /*=================================
    Tomamos la data de las categorias
    ====================================*/

    let getCategories = [];

    this.categoriesService.getData()
      .subscribe(resp => {

        let i;

        for (i in resp) {
          getCategories.push(resp[i]);
        }

    /*=====================================================
    Ordenamos de mayor a menor vistas el arreglo de objetos
    =======================================================*/

    getCategories.sort(function(a,b){

      return (b.view - a.view)
    })

     /*=====================================================
    Filtramos hasta 6 categories
    =======================================================*/

    getCategories.forEach((category, index)=>{

      if(index < 6){
        this.categories[index] = getCategories[index];
           this.cargando = false;
      }
    })

      })
  }
}
