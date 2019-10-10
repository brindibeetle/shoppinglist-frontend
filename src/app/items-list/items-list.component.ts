import { Component, OnInit } from '@angular/core';
import { ItemListService } from '../service/data/item-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items : Array<Item>;
  selectedLine : number = -1;
  actionCurrent : ActionCurrent = ActionCurrent.NOTHING;
  units = ['Liter', 'Kilogram', 'Number'];

  constructor(private itemListService : ItemListService, private activatedRoute : ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.retrieveAllItems();
  }

  saveItem(item : Item){
    this.itemListService.saveItem(item).subscribe(
      response => {
        console.log(response);
        this.retrieveAllItems();
      }
    )
  }
  deleteItem(item : Item){
    this.itemListService.deleteItem(item).subscribe(
      response => {
        console.log(response);
        this.retrieveAllItems();
      }
    )
  }
  retrieveAllItems() {
    this.itemListService.retrieveAllItems().subscribe(
      response => {
        console.log(response);
        this.items = response;
      }

    )
  }

  getAll() {
    console.log(this.itemListService.retrieveAllItems());
  }

  selectLine(i : number) {
    this.selectedLine = i;
    this.actionCurrent = ActionCurrent.SELECT;
  }
 
  plus() {
    this.actionCurrent = ActionCurrent.EDIT;
    this.items.push(new Item(0, "", "", ""));
    this.selectedLine = this.items.length -1;
  }

  edit() {
    this.actionCurrent = ActionCurrent.EDIT;
  }
  
  save() {
    var item : Item = this.items[this.selectedLine];
    console.log(" this.selectedLine " + this.selectedLine);
    console.log(" this.items[this.selectedLine] " + item.name);
    this.saveItem(item);
    this.selectedLine = -1;
    this.actionCurrent = ActionCurrent.NOTHING;
  }
  
  cancel() {
    this.selectedLine = -1;
    this.actionCurrent = ActionCurrent.NOTHING;
    this.retrieveAllItems();
  }

  delete() {
    this.actionCurrent = ActionCurrent.DELETE;
  }

  saveDelete() {
    this.deleteItem(this.items[this.selectedLine])
    this.selectedLine = -1;
    this.actionCurrent = ActionCurrent.NOTHING;
  }

  selectAndEditLine (i : number) {
    this.selectLine(i);
    this.edit();
  }
}

export class Item {

  constructor(
    public id : number
    , public name : string
    , public description : string
    , public unit : string
  ) {  }
}

export enum ActionCurrent { NOTHING, SELECT, EDIT, DELETE }