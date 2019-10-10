import { Injectable } from '@angular/core';
import { Item } from 'src/app/items-list/items-list.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemListService {

  
  constructor(
    private http:HttpClient) { }
  // constructor() { }

  retrieveAllItems() {
    //  console.log("--> ItemListService.retrieveAllItems")
    return this.http.get<Item[]>(`http://localhost:8080/items/all/`);

//     var items : Array<Item> = [ (new Item("name", "description", "unit"))
//     , (new Item("nam2", "descriptio2", "uni2"))
//     ]
//     this.http.get<Item[]>(`http://localhost:8080/items/all/`);
// return items;
  }

  deleteItem(item: Item) {
    return this.http.delete<string>(`http://localhost:8080/items/item/${item.id}/`);
  }
  saveItem(item: Item) {
    return this.http.put<Item>(`http://localhost:8080/items/item/`, item);
  }

}
