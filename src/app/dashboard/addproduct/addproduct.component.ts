import { Component, OnInit } from '@angular/core';
import * as category from "../../../app_content/categories.json"; //importing category from JSON -added by Nanda
 
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  categoryJSON: JSON;
  selectedCategory1: string;
  selectedCategory2: string;
  selectedCategory3: string;
  main_categories : any;
  sec_categories : any;
  ter_categories : any;

  constructor() {
  }
  
  selectedCategory1Status(){
    if(this.selectedCategory1 != null){
      this.sec_categories = category.categories[this.selectedCategory1];
      return true;
    }
    return false;
  }

  getSelectedCategory1Status(){
    return this.selectedCategory1;
  }

  selectedCategory2Status(){
    if(this.selectedCategory2 != null){
      this.ter_categories = category.categories[this.selectedCategory1][this.selectedCategory2];
      return true;
    }
    return false;
  }

  getSelectedCategory2Status(){
    return this.selectedCategory2;
  }

  ngOnInit() {
    this.main_categories = category.categories;
  }

}
