import { Component, OnInit } from '@angular/core';
import {order} from '../../models/order';
import{enquiry_action_items} from '../../models/enquiry_action_items';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  x: order;
  orders :any;
  enq_act_items : any;
  constructor() { }

  ngOnInit() {
    let y = new order();
    y.customer="xxxx";
    y.date="yyyy";
    y.id = "1234";
    y.status = "pending";
    y.total = 150;
    y.link="#";
    this.orders = [y,y,y,y,y,y,y,y,y,y];

    let z = new enquiry_action_items();
    z.value = "abrakadabra";
    z.link = "#";
    this.enq_act_items = [z,z,z,z,z,z,z,z,z,z];
  }

}
