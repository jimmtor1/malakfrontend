import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderAssignment } from '../../model/orderAssignment';
import { BdQuerysService } from '../../services/bd-querys.service';
import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import { Element } from '../../model/element';
import { Order } from '../../model/order';
import { Employee } from '../../model/employee';
import { RoleService } from '../../services/role.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-workbook-employee',
  standalone: true,
  imports: [MatInputModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule,
    MatGridListModule, MatIconModule, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule, MatTabsModule],
  templateUrl: './workbook-employee.component.html',
  styleUrl: './workbook-employee.component.scss'
})
export class WorkbookEmployeeComponent implements OnInit {

  displayedColumns: string[] = ['I/P', 'order', 'element', 'quantity', 'startime', 'endtime', 'machine', 'manager', 'assistant', 'score'];
  dataSource: OrderAssignment[] = [];
  orderAssignment: OrderAssignment = {
    order: {},
    employee: Number(this.logService.getUser()),
    io: "I",
    elementId: 0,
    processingType: "",
    quantity: 0,
    startTime: "",
    endTime: "",
    machine: 0,
    manager: "V",
    assistant: 0,
    score: 0,
  }
  myControl = new FormControl('');
  myControl2 = new FormControl<string | Element>(''); //new FormControl({'id':0, 'name':''});
  elements: Element[] = [];
  filteredElements: Observable<Element[]>;
  filteredOrders: Observable<Order[]>;
  orders: Order[] = [];
  employees: Employee[] = [];
  orderLastSelection: Order = {};
  managerLastSelection = "";
  dataSourceform: OrderAssignment[] = [];
  @ViewChild(MatTable) table: MatTable<Element> | undefined;

  constructor(private dbservice: BdQuerysService, private logService: RoleService) {
    this.filteredOrders = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredElements = this.fillFilterElements();

    this.getEmployeeList();

  }

  ngOnInit(): void {

    this.dbservice.getApprovedOrderList().subscribe(o => {
      this.orders = o;
      // console.log(o);
    })

    this.getEmployeeList();

    // console.log(this.employees);

    this.updateTable();

  }

  chargeElements(orderId?: string) {
    if (orderId) {
      this.getElements(orderId);
    } else {
      if (this.myControl.value != null) {
        this.getElements(this.myControl.value);
      }
    }
  }

  getElements(idorder: string) {
    this.dbservice.getElementsByOrder(idorder).subscribe(e => {
      this.elements = e;
      this.filteredElements = this.fillFilterElements();
    })
  }

  fillFilterElements(): Observable<Element[]> {
    return this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter2(name as string) : this.elements.slice();
      }),
    );
  }

  private _filter2(value: string): Element[] {
    const filterValue = value.toLowerCase();
    return this.elements.filter(element => element.name!.toLowerCase().includes(filterValue));
  }

  private _filter(value: string): Order[] {
    const filterValue = value.toLowerCase();
    return this.orders.filter(order => order.id!.toLowerCase().includes(filterValue));
  }

  displayFn(element: Element): string {
    return element && element.name ? element.name : '';
  }

  getEmployeeList() {
    this.dbservice.getEmployeeList().subscribe(e => this.employees = e);
  }

  async add() {
    //if (this.validateElement()) {
    this.orderLastSelection = this.orderAssignment.order;
    this.managerLastSelection = this.orderAssignment.manager;
    this.orderAssignment.score = await this.getScoreCalculation();

    if (this.myControl2.value != null) {
      const elementid = typeof this.myControl2.value === 'string' ? this.myControl2.value : this.myControl2.value.id;
      if (elementid && typeof elementid === 'number') {
        this.orderAssignment.elementId = elementid;
      }
    }
    if (this.myControl.value != null) {
      this.orderAssignment.order.id = this.myControl.value;
    }
    this.dataSourceform.push(this.orderAssignment);
    this.table?.renderRows();
    // if (this.inputElement) {        
    // this.selectElement.nativeElement.focus();
    // }
    this.clearInputs();
    // } else {
    //   alert("Error: Required fields!");
    // }
  }

  clearInputs() {
    this.orderAssignment = {
      order: this.orderLastSelection,
      employee: Number(this.logService.getUser()),
      io: "I",
      elementId: 0,
      processingType: "",
      quantity: 0,
      startTime: "",
      endTime: "",
      machine: 0,
      manager: this.managerLastSelection,
      assistant: 0,
      score: 0
    }
  }

  save() {
    this.dbservice.saveOrderAssignment(this.dataSourceform).subscribe(t => {
      if (t) {
        this.updateTable();
        this.dataSourceform = [];
        alert("saved");
      }
    });
  }

  updateTable() {
    if (this.orderAssignment.employee) {
      this.dbservice.getOrderAssignment(this.orderAssignment.employee).subscribe(os => {
        this.dataSource = os;
      })
    }
  }

  async getScoreCalculation(): Promise<number> {

    if (this.orderAssignment.manager == "V") {

      let endMinutes = this.catchTimeInNumber(this.orderAssignment.endTime);
      let startMinutes = this.catchTimeInNumber(this.orderAssignment.startTime);

      let totalMinutes = endMinutes - startMinutes;

      return totalMinutes * 0.208333;
    } else {
      return this.orderAssignment.quantity * await this.getB_Coeffient(this.orderAssignment.processingType);
    }

  }

  catchTimeInNumber(time: string): number {

    // Assuming timeString is in the format "HH:mm:ss"
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    // Convert time to total minutes
    // const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const totalMin = hours * 60 + minutes;

    return totalMin;

  }

  async getB_Coeffient(processingType: string): Promise<number> {
    const c = await firstValueFrom(this.dbservice.getBCoefficient(processingType));
    if (c) {
      return c.coefficient;
    } else {
      return 0.0;
    }
  }

  getNameForId(id: number): string {
    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index].id == id) {
        return this.employees[index].name!;
      }
    }
    return "";
  }


}
