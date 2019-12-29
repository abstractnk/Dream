import { Component, OnInit } from '@angular/core';
import * as category from "../../../app_content/categories.json"; //importing category from JSON -added by Nanda
import { FormGroup , FormControl , FormBuilder , Validators} from '@angular/forms';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { all } from 'q';
//import { createHttpLink } from "apollo-link-http"; this import is not resolvable
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
 

const tokenAuth = gql`
  mutation addNewItem($mainCategory: String!,$subCategory1: String!,$subCategory2: String!,$productName: String!,$description: String!,$price: float!,$totalQuantityLeft: int!) {
    addNewItem(mainCategory: $mainCategory,subCategory1: $subCategory1,subCategory2: $subCategory2,productName: $productName,description: $description,price: $price,totalQuantityLeft: $itotalQuantityLeftnt) {
      itemKey
    }
  }
`;

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
  productName : any;
  description : any;
  price : any;

  data : any;
  errors : any;

  disableAll = false;
  submitMessage = false;

  constructor(private apollo: Apollo) {
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
    this.main_categories = category.categories;
  }
  
  submitItem(){
    this.disableAll = true;
    this.submitMessage = true;

     
    this.apollo.mutate({
      mutation: tokenAuth,
      variables: {
        mainCategory: this.selectedCategory1,
        subCategory1: this.selectedCategory2,
        subCategory2: this.selectedCategory3,
        productName: this.productName,
        description: this.description,
        price: this.price,
        totalQuantityLeft: 10
      },
      errorPolicy : "all",
    }).subscribe(
      ({data,errors,context,extensions}) => {
      this.data=data;
      this.errors = errors;
    },(error) => {
      console.log('there was an error sending the query', error);
    }
    
    );  

    // Need to set context to give headers. But not able to resolve import on line 7
    // const client = new ApolloClient({
    //   link: createHttpLink({ uri: "/graphql" }),
    //   cache: new InMemoryCache()
    // });
    
    // // a query with apollo-client
    // client.query({
    //   query: tokenAuth,
    //   context: {
    //     headers: {
    //       Authorization: "JWT "+localStorage.get('token')
    //     }
    //   }
    // });
    
  }

  resetAll(){
    this.selectedCategory1 = null;
    this.selectedCategory2 = null;
    this.selectedCategory3 = null;

    this.productName = null;
    this.description = null;
    this.price = null;

    this.disableAll = false;
    this.submitMessage = false;
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
