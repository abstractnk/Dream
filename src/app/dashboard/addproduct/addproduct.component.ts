import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  categoryJSON: JSON;
  selectedCategory1: string;
  selectedCategory2: string;
  
  constructor() {
    var data = require('../../../app_content/categories.json') 
    this.categoryJSON = data;
    console.log("Json data : ", JSON.stringify(data));
    console.log("Selected Value: ",this.selectedCategory1);
  }
  
  selectedCategory1Status(){
    if(this.selectedCategory1 != null){
      return true;
    }
    return false;
  }

  getSelectedCategory1Status(){
    return this.selectedCategory1;
  }

  verify(item: string){
    console.log("item is ",item)
    if(item == this.selectedCategory1){
      return true;
    }
    return false;
  }

  ngOnInit() {
  }

}
