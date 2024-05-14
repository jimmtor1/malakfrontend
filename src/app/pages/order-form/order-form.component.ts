import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { Order } from '../../model/order';
import { BdQuerysService } from '../../services/bd-querys.service';
import { Router } from '@angular/router';
import { Customer } from '../../model/customer';
import { ElementFormComponent } from '../element-form/element-form.component';
import { MatIconModule } from '@angular/material/icon';
import { Element } from '../../model/element';
import { MatTable, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatGridListModule, MatSelectModule, ElementFormComponent, MatIconModule, MatTableModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss'
})
export class OrderFormComponent implements OnInit {

  order: Order = {
    customer: { id: 0 },
    suffix: ""
  }

  customers: Customer[] = [];

  element: Element = {
    name: "",
    material: "",
    length: 0,
    width: 0,
    height: 0,
    quantity: 0,
    order: { id: "" }
  }

  displayedColumns: string[] = ['name', 'length', 'height', 'width', 'quantity', 'delete'];
  dataSource: Element[] = [];

  @ViewChild(MatTable) table: MatTable<Element> | undefined;

  constructor(private bdService: BdQuerysService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    this.bdService.getCustomerList().subscribe(c => {
      this.customers = c;
    });
  }

  saveOrder() {
    if (this.order.customer!.id != 0) {
      this.bdService.saveOrder(this.order).subscribe(o => {
        if (o.id) {
          this.router.navigate([`elementform/${o.id}/${o.customer?.id}`]);
        }
      });
    }
  }

  addElement() {
    if (this.validateElement()) {
      this.dataSource.push(this.element);
      this.table?.renderRows();
      this.clearInputs();
    } else {
      alert("Error: Required fields!");
    }
  }

  removeData(element: Element) {
    const index = this.dataSource.indexOf(element);
    this.dataSource.splice(index, 1);
    this.table?.renderRows();
  }

  validateElement(): boolean {
    return this.element.name != "" && this.element.length! > 0 && this.element.height! > 0 && this.element.width! > 0 && this.element.quantity! > 0;
  }

  clearInputs() {
    this.element = {
      name: "",
      material:"",
      length: 0,
      width: 0,
      height: 0,
      quantity: 0,
      order: { id: "" }
    }
  }

  save() {
    alert("Saved");
  }

  cancel() {

  }


}
