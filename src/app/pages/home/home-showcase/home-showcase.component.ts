import { Component, OnInit } from '@angular/core';
import { Path } from '../../../config';

@Component({
  selector: 'app-home-showcase',
  templateUrl: './home-showcase.component.html',
  styleUrls: ['./home-showcase.component.css']
})
export class HomeShowcaseComponent implements OnInit {

  path: String = Path.url;

  constructor() { }

  ngOnInit(): void {
  }

}
