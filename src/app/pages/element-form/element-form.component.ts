import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { Element } from '../../model/element';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { BdQuerysService } from '../../services/bd-querys.service';
import { OrderTemplateComponent } from '../order-template/order-template.component';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../../model/order';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-element-form',
  standalone: true,
  imports: [MatSelectModule, MatGridListModule, MatFormFieldModule, FormsModule, MatTableModule, MatIconModule, MatInputModule, MatButtonModule],
  templateUrl: './element-form.component.html',
  styleUrl: './element-form.component.scss'
})
export class ElementFormComponent implements OnInit {

  orderId: string = "";
  customerId: number = 0;
  orderCustomerList: Order[] = [];
  orderTemplate: string = "";

  // repetition = 0;

  element: Element = {
    name: "",
    material: "",
    length: 0,
    width: 0,
    height: 0,
    quantity: 0,
    order: { id: "" }
  }

  displayedColumns: string[] = ['Num', 'name', 'material', 'length', 'height', 'width', 'quantity', 'delete'];
  dataSource: Element[] = [];

  @ViewChild(MatTable) table: MatTable<Element> | undefined;
  @ViewChild('miInput') miInputElemento: ElementRef | undefined;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private bdService: BdQuerysService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.customerId = parseInt(this.activatedRoute.snapshot.paramMap.get('customerid')!);

    this.bdService.getOrderByCustomer(this.customerId).subscribe(l => {
      this.orderCustomerList = l;
    });

  }

  addElement() {
    if (this.validateElement()) {
      this.element.order!.id = this.orderId;
      // for (let index = 0; index < this.repetition; index++) {        
      this.dataSource.push(this.element);
      // }

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
      name: this.element.name,
      material: this.element.material,
      length: this.element.length,
      width: this.element.width,
      height: this.element.height,
      quantity: 0,
      order: { id: "" }
    }
    this.miInputElemento!.nativeElement.focus();
  }

  save() {
    if (this.dataSource.length > 0) {
      // console.log(this.dataSource)
      this.bdService.saveElement(this.dataSource).subscribe(o => {
        if (o) {
          this.router.navigate(['orderlist']);
        }
      });
    }

  }

  cancel() {
    this.dataSource = [];
    this.clearInputs();
  }

  openDialog(templateNum:number) {
    const dialogRef = this.dialog.open(OrderTemplateComponent, {
      data: templateNum
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes manejar la información recibida del diálogo  

      for (let index = 0; index < result.length; index++) {
        result[index].order = { id: this.orderId };
      }
      this.dataSource = result;


    });
  }

  getPreviousElements() {
    console.log("orderid: " + this.orderTemplate)
    this.bdService.getElementsByOrder(this.orderTemplate).subscribe(e => {
      console.log(e);
      this.dataSource = e;
    });

  }


}
