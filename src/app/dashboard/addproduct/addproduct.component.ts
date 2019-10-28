import { Component, OnInit } from '@angular/core';
import * as category from "../../../app_content/categories.json"; //importing category from JSON -added by Nanda
import { FormGroup , FormControl , FormBuilder , Validators} from '@angular/forms';
import { ImageuploadComponent } from '../imageupload/imageupload.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers: [ImageuploadComponent]
})
export class AddproductComponent implements OnInit {

  categoryJSON: JSON;
  selectedCategory1: string;
  selectedCategory2: string;
  selectedCategory3: string;
  main_categories : any;
  sec_categories : any;
  ter_categories : any;
  productName : any;
  description : any;
  price : any;

  disableAll = false;
  submitMessage = false;

  constructor(private images:ImageuploadComponent) {
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

  clearAll(){
    console.log("clear all")
    this.selectedCategory2 = null
      this.selectedCategory3 = null
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
    console.log("IN ADD PRODUCT");
    
    this.main_categories = category.categories;
  }
  
  submitItem(){
    this.disableAll = true;
    this.submitMessage = true;
  }

  resetAll(event){
    this.selectedCategory1 = null;
    this.selectedCategory2 = null;
    this.selectedCategory3 = null;

    this.productName = null;
    this.description = null;
    this.price = null;

    this.disableAll = false;
    this.submitMessage = false;
    this.images.resetImageList(event);
  }

  submitStatus(){
    if(this.selectedCategory1 != null &&
      this.selectedCategory2 != null &&
      this.selectedCategory3 != null &&
      this.productName != null &&
      this.description != null &&
      this.price != null
      ){
        return true;
      }
      return false;
  }


}
