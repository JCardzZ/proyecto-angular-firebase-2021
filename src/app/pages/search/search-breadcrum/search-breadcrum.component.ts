import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-breadcrum',
  templateUrl: './search-breadcrum.component.html',
  styleUrls: ['./search-breadcrum.component.css']
})
export class SearchBreadcrumComponent implements OnInit {

  breadcrumb:string = null;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    /*=======================================
Capturamos el párametro URL
    ========================================*/

    this.breadcrumb = this.activatedRoute.snapshot.params["param"].replace(/[_]/g, " ");


  }

}
