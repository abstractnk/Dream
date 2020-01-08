import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const tokenAuth = gql`
query{
  itemsByUser{
    id
    price
    quantityLeft
    itemId{
      itemKey
      mainCategory
      subCategory1
      subCategory2
      productName
      description
      price
      totalQuantityLeft
    }
  }
}
`;

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})

export class ViewproductsComponent implements OnInit {

  private querySubscription: Subscription;
  data : any;
  allItems : any;
  errors : any;
  user: any[] ;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
   
    console.log(">>>>>> In ngoninit");
    this.querySubscription = this.apollo.watchQuery<any>({
      query: tokenAuth,
      //errorPolicy : "all",
      context: { 
        headers: new HttpHeaders().set("Authorization", "JWT "+localStorage.getItem('token'))
       },
    })
      .valueChanges
      .subscribe(
        ({data}) => {
        this.display(data);
          //this.data=data;
        // console.log(">>>>>> 1"+ this.data["itemsByUser"][0]["itemId"]["productName"]);
        // this.allItems = this.data["itemsByUser"];
        // console.log(">>>>>> 1"+ this.allItems[0]["itemId"]["productName"]);
        //this.errors = errors;
      },(error) => {
        console.log('there was an error sending the query', error);
      }
      );
        
  }

  display(data1: any){
    console.log(">>>>>> 1"+ data1["itemsByUser"][0]["quantityLeft"]);
    this.data = data1["itemsByUser"];

  }


}
