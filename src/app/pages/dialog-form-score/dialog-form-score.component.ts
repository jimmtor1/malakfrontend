import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTable, MatTableModule } from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BdQuerysService } from '../../services/bd-querys.service';
import { Order } from '../../model/order';
import { Element } from '../../model/element';
import { Employee } from '../../model/employee';
import { OrderAssignment } from '../../model/orderAssignment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable, firstValueFrom } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTabsModule } from '@angular/material/tabs';
import { Jobperformance } from '../../model/jobperformance';

import { DatePickerComponent } from '../../common/date-picker/date-picker.component';


@Component({
  selector: 'app-dialog-form-score',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions,
    MatTableModule, MatSelectModule, MatButtonModule, FormsModule,
    MatGridListModule, MatIconModule, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule, MatTabsModule, DatePickerComponent],
  templateUrl: './dialog-form-score.component.html',
  styleUrl: './dialog-form-score.component.scss',
  providers: [DatePipe]
})
export class DialogFormScoreComponent implements OnInit {

  orders: Order[] = [];
  filteredOrders: Observable<Order[]>;
  // newdata = true;
  employees: Employee[] = [];
  coefficient = 0;
  aditonalScore = 0;
  @ViewChild('datePicker') datePicker!: DatePickerComponent;

  totalMin = 0;

  L: number = 0;
  M: number = 0;
  N: number = 0;



  selectedElement: Element = {}

  orderAssignment: OrderAssignment = {
    order: {},
    employee: 0,
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

  elements: Element[] = [];
  filteredElements: Observable<Element[]>;
  filteredEmployee: Observable<Employee[]>;

  @ViewChild(MatTable) table: MatTable<Element> | undefined;
  // @ViewChild('inputElement') inputElement: ElementRef | undefined;
  myControl = new FormControl('');
  myControl2 = new FormControl<string | Element>(''); //new FormControl({'id':0, 'name':''});
  myControl3 = new FormControl<string | Employee>(''); //new FormControl({'id':0, 'name':''});

  displayedColumns: string[] = ['I/P', 'order', 'element', 'quantity', 'startime', 'endtime', 'machine', 'manager', 'assistant', 'score', 'delete'];
  displayedColumns2: string[] = ['I/P', 'order', 'element', 'quantity', 'startime', 'endtime', 'machine', 'manager', 'assistant', 'score'];
  dataSource: OrderAssignment[] = [];

  dataSourceform: OrderAssignment[] = [];

  orderLastSelection: Order = {};
  managerLastSelection = "";

  showSaveButton = true;

  constructor(private dbservice: BdQuerysService, @Inject(MAT_DIALOG_DATA) public jobperformance: Jobperformance, private datePipe: DatePipe) {
    this.filteredOrders = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredElements = this.fillFilterElements();
    this.filteredEmployee = this.fillFilterEmployee();

  }

  ngOnInit(): void {

    this.dbservice.getApprovedOrderList().subscribe(o => {
      this.orders = o;
    })

    this.getEmployeeList();

    this.updateTable();

    this.totalMin = 0;

  }

  displayFn(element: Element): string {
    return element && element.consecutive ? element.consecutive.toString() : '';
  }

  displayFn2(employee: Employee): string {
    return employee && employee.name ? employee.name.toString() : '';
  }

  private _filter3(value: string): Employee[] {
    //const filterValue = value.toLowerCase();
    const filterValue = value.toString();
    //return this.elements.filter(element => element.name!.toLowerCase().includes(filterValue));
    return this.employees.filter(employee => employee.name?.toLowerCase().includes(filterValue));
  }


  private _filter2(value: number): Element[] {
    //const filterValue = value.toLowerCase();
    const filterValue = value.toString();
    //return this.elements.filter(element => element.name!.toLowerCase().includes(filterValue));
    return this.elements.filter(element => element.consecutive?.toString()!.includes(filterValue));
  }

  private _filter(value: string): Order[] {
    const filterValue = value.toLowerCase();
    return this.orders.filter(order => order.id!.toLowerCase().includes(filterValue));
  }

  async add() {
    //if (this.validateElement()) {

    this.orderAssignment.employee = this.jobperformance.employeeId
    this.orderLastSelection = this.orderAssignment.order;
    this.managerLastSelection = this.orderAssignment.manager;
    if (this.aditonalScore > 0) {
      this.orderAssignment.score = this.aditonalScore + await this.getScoreCalculation();
    } else {
      this.orderAssignment.score = await this.getScoreCalculation();
    }


    if (this.myControl2.value != null) {
      const elementid = typeof this.myControl2.value === 'string' ? parseInt(this.myControl2.value) : this.myControl2.value.id;
      if (elementid /*&& typeof elementid === 'number'*/) {
        this.orderAssignment.elementId = elementid;
      }
    }


    if (this.myControl3.value != null) {
      const employee = typeof this.myControl3.value === 'string' ? parseInt(this.myControl3.value) : this.myControl3.value.id;
      if (employee && typeof employee === 'number') {
        this.orderAssignment.assistant = employee;
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
    this.sumMin();
    this.clearInputs();
    // } else {
    //   alert("Error: Required fields!");
    // }
  }

  validateElement(): boolean {
    return this.orderAssignment.order != null && this.orderAssignment.elementId > 0 && this.orderAssignment.quantity > 0 && this.orderAssignment.startTime != "" && this.orderAssignment.endTime != "" && this.orderAssignment.machine > 0 && this.orderAssignment.manager != "";
  }

  sumMin() {
    
    if(!this.orderAssignment.startTime.includes(":") || !this.orderAssignment.endTime.includes(":")){
      return;
    }

    const [horasInicio, minutosInicio] = this.orderAssignment.startTime.split(':').map(Number);
    const [horasFin, minutosFin] = this.orderAssignment.endTime.split(':').map(Number);

    // Convertir horas y minutos a minutos totales
    const minutosTotalesInicio = horasInicio * 60 + minutosInicio;
    const minutosTotalesFin = horasFin * 60 + minutosFin;

    // Calcular la diferencia
    let diferencia = minutosTotalesFin - minutosTotalesInicio;

    // Convertir la diferencia en horas y minutos
    // const horas = Math.floor(diferencia / 60);
    // const minutos = diferencia % 60;

    // Formatear a "HH:mm"
    // console.log(`${horas < 10 ? '0' + horas : horas}:${minutos < 10 ? '0' + minutos : minutos}`);
    this.totalMin =  diferencia + this.totalMin;

  }

  clearInputs() {
    const date: string = this.orderAssignment.endTime;
    const element: number = this.orderAssignment.elementId;
    const procesing: string = this.orderAssignment.processingType;
    const assitant: number = this.orderAssignment.assistant;
    const machine: number = this.orderAssignment.machine;
    this.orderAssignment = {
      order: {},//this.orderLastSelection,
      employee: 0,
      io: "I",
      elementId: element,
      processingType: procesing,
      quantity: 0,
      startTime: date,
      endTime: "",
      machine: machine,
      manager: this.managerLastSelection,
      assistant: assitant,
      score: 0
    }
    this.aditonalScore = 0;
  }

  save() {

    this.dataSourceform.forEach(d => {
      d.registrationDate = this.datePipe.transform(this.datePicker.selectedDate, 'yyyy-MM-dd')!;
    });

    this.dbservice.saveOrderAssignment(this.dataSourceform).subscribe(t => {
      if (t) {
        this.updateTable();
        this.dataSourceform = [];
        alert("saved");
      }
    });
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

  updateTable() {
    if (this.jobperformance.employeeId) {
      this.dbservice.getOrderAssignment(this.jobperformance.employeeId).subscribe(os => {
        this.dataSource = os;
      })
    }
  }

  getElements(idorder: string) {
    this.dbservice.getElementsByOrder(idorder).subscribe(e => {
      this.elements = e;
      this.fillElementConsecutives();
      this.filteredElements = this.fillFilterElements();
    })
  }

  fillElementConsecutives() {
    for (let index = 0; index < this.elements.length; index++) {
      this.elements[index].consecutive = index + 1;
    }
  }

  getElementNameFromId(id: number): string {
    let elementName = "";
    this.elements.forEach(e => {
      if (e.id == id) {
        elementName = e.name!;
      }
    });
    return elementName;
  }

  fillFilterElements(): Observable<Element[]> {
    return this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.consecutive;
        return name ? this._filter2(name as number) : this.elements.slice();
      }),
    );

  }

  fillFilterEmployee(): Observable<Employee[]> {

    return this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter3(name as string) : this.employees.slice();
      }),
    );

  }

  changeStateSaveButton() {
    this.showSaveButton = !this.showSaveButton;
  }

  getEmployeeList() {
    this.dbservice.getEmployeeList().subscribe(e => {
      this.employees = e
      this.filteredElements = this.fillFilterElements();
    });

  }

  getNameForId(id: number): string {
    for (let index = 0; index < this.employees.length; index++) {
      if (this.employees[index].id == id) {
        return this.employees[index].name!;
      }
    }
    return "";
  }

  async getScoreCalculation(): Promise<number> {

    if (this.orderAssignment.manager == "V") {

      let endMinutes = this.catchTimeInNumber(this.orderAssignment.endTime);
      let startMinutes = this.catchTimeInNumber(this.orderAssignment.startTime);
      if (isNaN(startMinutes)) {
        startMinutes = 0
      }
      if (isNaN(endMinutes)) {
        endMinutes = 0
      }

      let totalMinutes = endMinutes - startMinutes;

      return (totalMinutes * 0.208333) + await this.calculateSomething();

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

  //is not used
  sumarMinutoAHora(horaString: string): string {
    // Convertir el string en un objeto Date
    const horaActual: Date = new Date(`01/01/2000 ${horaString}`);

    // Sumar un minuto
    horaActual.setMinutes(horaActual.getMinutes() + 1);

    // Obtener las partes de la hora (hora y minutos)
    const hora: number = horaActual.getHours();
    const minutos: number = horaActual.getMinutes();

    // Formatear la hora y los minutos
    const horaFormateada: string = (hora < 10 ? '0' : '') + hora.toString();
    const minutosFormateados: string = (minutos < 10 ? '0' : '') + minutos.toString();

    // Devolver la hora en formato string
    return `${horaFormateada}:${minutosFormateados}`;
  }

  removeData(orderAssignment: OrderAssignment) {
    const index = this.dataSourceform.indexOf(orderAssignment);
    this.dataSourceform.splice(index, 1);
    this.table?.renderRows();
  }

  async calculateSomething(): Promise<number> {

    if (this.myControl2.value != null) {
      const element = typeof this.myControl2.value === 'string' ? null : this.myControl2.value;
      if (element /*&& typeof elementid === 'number'*/) {
        this.selectedElement = element;
      }
    }

    const height = this.selectedElement?.height;  // visina
    const width = this.selectedElement?.width;   // sirina
    const length = this.selectedElement?.length;  // duzina


    const coefficient = await this.getB_Coeffient(this.orderAssignment.processingType);

    let rs = 0;
    let rs2 = 0;
    let rs3 = 0;

    if (length != null && width != null && height != null && this.orderAssignment.quantity != null) {
      //(duzina * L)+ (sirina * M) * količina
      rs = ((length * this.L) + (width * this.M)) * this.orderAssignment.quantity
      rs = rs * coefficient;  // sum 1    (*)=multiplication
      // console.log("rs " + rs)
      //Količina * (dužina* (širina*M) + (Visina * N)))

      rs2 = this.orderAssignment.quantity * ((length * width * this.M) + (height * this.N));
      rs2 = rs2 * coefficient;
      // console.log("rs " + rs2);
      // (dužina * širina * visina)
      rs3 = (length * width * height);
      rs3 = rs3 * coefficient; //sum 
      // console.log("rs " + rs3);
    }
    // console.log(rs + rs2 + rs3);
    let rs4 = 0;
    if ((this.L > 0 && this.M == 0) || (this.L > 0 && this.N > 0) || (this.M > 0 && this.N > 0)) {  // if L = 1 just sum to score rs
      rs4 = rs;
    } else if (this.L > 0 && this.M > 0) {
      rs4 = rs2
    }
    return rs4;

  }

  chargeElementDimension() {
    if (this.myControl2.value != null) {
      const element = typeof this.myControl2.value === 'string' ? null : this.myControl2.value;
      if (element /*&& typeof elementid === 'number'*/) {
        this.selectedElement = element;
      }
    }
  }



}
