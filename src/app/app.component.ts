import { Component, OnInit } from '@angular/core';
import { MultiSelectList, MultiSelectItem } from './multiSelect.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  listItem: Array<MultiSelectList>;
  textSearch: string;
  isOpenPopup: boolean;

  ngOnInit() {
    this.isOpenPopup = false;
    this.checkedList = [];
    this.selectedItem = [];
    this.loadData();
  }

  hideDialog(event: any) {
    this.isOpenPopup = false;
  }

  loadData() {
    this.listItem = [{
      name: "Australia", label: "AU", checked: false,
      items: [
        { name: "Australia 1", label: "AU1" },
        { name: "Australia 2", label: "AU2" },
        { name: "Australia 3", label: "AU3" },
      ]
    },
    {
      name: "Brazil", label: "BR", checked: false, items: [
        { name: "Brazil 1", label: "B1" },
        { name: "Brazil 2", label: "B2" },
        { name: "Brazil 3", label: "B3" },
      ]
    },
    { name: "China", label: "CN", checked: false },
    { name: "Egypt", label: "EG", checked: false },
    { name: "France", label: "FR", checked: false },
    { name: "Germany", label: "DE", checked: false },
    { name: "India", label: "IN", checked: false },
    { name: "Japan", label: "JP", checked: false },
    { name: "Spain", label: "ES", checked: false },
    { name: "United States", label: "US", checked: false }
    ] as Array<MultiSelectList>;
  }

  toggleSelect() {
    this.isOpenPopup = this.isOpenPopup === true ? false : true;
  }

  onChangeText(event) {
    if (event && event.target) {
      const value = event.target.value;
      if (value && this.listItem && this.listItem.length > 0) {
        console.log(this.listItem);
        //TODO: change search from db if there are too many items
        this.listItem = this.listItem.filter(x => x.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
    }
  }

  checkUncheckAll(checked: boolean) {
    for (let i = 0; i < this.listItem.length; i++) {
      const item = this.listItem[i];
      item.checked = checked;
      if (item.items && item.items.length > 0) {
        item.items.forEach((sub: MultiSelectItem) => {
          sub.checked = checked;
        });
      }
    }
    this.getCheckedItemList();
  }

  onRemoveItem(item: MultiSelectItem) {
    this.isOpenPopup = true;
    item.checked = false;
    if (this.listItem) {
      this.listItem.forEach((multi: MultiSelectList) => {
        if (multi.items && multi.items.length > 0) {
          const itemExist = multi.items.filter(x => x.label === item.label);
          if (itemExist.length > 0) {
            itemExist.forEach((sub: MultiSelectItem) => {
              sub.checked = false;
            });
          }
        }
      });
    }

    if (this.selectedItem) {
      this.selectedItem = this.selectedItem.filter(x => x.label !== item.label);
    }
    if (this.checkedList) {
      this.checkedList.forEach((multi: MultiSelectList) => {
        if (multi.items) {
          multi.items = multi.items.filter(x => x.label !== item.label);
        }
      });
    }
  }

  masterSelected: boolean;
  checkedList: any;
  isCheckedParent(parent: MultiSelectList, checked: boolean) {
    if (parent) {
      parent.checked = checked;
      if (parent.items) {
        parent.items.forEach((item: MultiSelectList) => {
          item.checked = checked;
        });
      }
    }
    this.getCheckedItemList();
  }

  isCheckedChildren(sub: MultiSelectItem, checked: boolean) {
    sub.checked = checked;
    this.getCheckedItemList();
  }

  selectedItem: Array<MultiSelectItem>;
  getCheckedItemList() {
    this.checkedList = [];
    this.selectedItem = [];
    const listItem = JSON.parse(JSON.stringify(this.listItem));
    for (let i = 0; i < listItem.length; i++) {
      const item = listItem[i];
      item.items = this.addSelected(item.items)
      if (item.checked) {
        this.checkedList.push(item);
      }
    }
    console.log(JSON.stringify(this.checkedList));
  }

  addSelected(items: Array<MultiSelectItem>) {
    if (items && items.length > 0) {
      items = items.filter(x => x.checked);
      items.forEach((sub: MultiSelectItem) => {
        this.selectedItem.push(sub);
      });
    }
    return items;
  }
}
