import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { SubCategoriesService } from '../../../services/sub-categories.service';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-products-breadcrumb',
  templateUrl: './products-breadcrumb.component.html',
  styleUrls: ['./products-breadcrumb.component.css']
})
export class ProductsBreadcrumbComponent implements OnInit {

  breadCrumb: String = null;

  constructor(private categoriesService: CategoriesService,
    private subCategoriesService: SubCategoriesService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {


    let params = this.activatedRoute.snapshot.params["param"];


    /*================================================================
         Filtramos data de las categorias
    =================================================================*/
    this.categoriesService.getFilterData("url", params)
      .subscribe(resp1 => {


        if (Object.keys(resp1).length > 0) {

          let i;
          for (i in resp1) {

            this.breadCrumb = resp1[i].name;

          }
        } else {


          /*================================================================
                  Filtramos data de las Subcategorias
             =================================================================*/
          this.subCategoriesService.getFilterData("url", params)
            .subscribe(resp2 => {

              let i;
              for (i in resp2) {

                this.breadCrumb = resp2[i].name;

              }

            })

        }
      })

  }

}
