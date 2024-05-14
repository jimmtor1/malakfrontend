import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer';
import { Employee } from '../model/employee';
import { Order } from '../model/order';
import { Element } from '../model/element';
import { LoginDTO } from '../model/login-dto';
import { OrderAssignment } from '../model/orderAssignment';
import { Coeficientb } from '../model/coeficientb';
import { ScoreEmployeSumDTO } from '../model/score-employe-sum-dto';
import { Jobperformance } from '../model/jobperformance';
import { TitleAndDataTableScoreMonth } from '../model/title-and-data-table-score-month';

@Injectable({
  providedIn: 'root'
})
export class BdQuerysService {

  // url = "http://localhost:8080/";
  url = "http://116.203.244.119:8080/"

  constructor(private http: HttpClient) { }

  public saveCustom(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}customer`, customer);
  }

  public saveEmployee(employee: Employee): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}employee`, employee);
  }

  public saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.url}order`, order);
  }

  public saveElement(element: Element[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}order/elements`, element);
  }

  public saveOrderAssignment(orderAssignment: OrderAssignment[]): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}assignment`, orderAssignment);
  }

  public changeStatusOrder(id: number, status: number) {
    return this.http.get(`${this.url}order/approve/${id}/${status}`);
  }

  public deleteOrder(id: number) {
    return this.http.delete(`${this.url}order/${id}`);
  }

  public getCustomerList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}customer`);
  }

  //no approved
  public getOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}order`);
  }

  //approved
  public getApprovedOrderList(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}order/approved`);
  }

  //By customer
  public getOrderByCustomer(idcustomer: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}order/${idcustomer}`);
  }

  //all
  // public getAllOrderList():Observable<Order[]> {  
  //   return this.http.get<Order[]>(`${this.url}order/all`);
  // }

  public getElementsByOrder(idorder: string): Observable<Element[]> {
    return this.http.get<Element[]>(`${this.url}order/elements/${idorder}`);
  }

  public getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}employee`);
  }

  public getOrderAssignment(idemployee: number): Observable<OrderAssignment[]> {
    return this.http.get<OrderAssignment[]>(`${this.url}assignment/${idemployee}`);
  }

  public getBCoefficient(processingType: string): Observable<Coeficientb> {
    return this.http.get<Coeficientb>(`${this.url}assignment/coefficient/${processingType}`);
  }

  public getScoreByEmployeeMonth(idemployee: number, month: number): Observable<ScoreEmployeSumDTO[]> {
    return this.http.get<ScoreEmployeSumDTO[]>(`${this.url}assignment/resume/${idemployee}/${month}`);
  }

  public getScoreAvgByEmployeeLast3Months(): Observable<Jobperformance[]> {
    return this.http.get<Jobperformance[]>(`${this.url}assignment/average`);
  }

  public getAllScoresThisMonth(month: number): Observable<TitleAndDataTableScoreMonth> {
    return this.http.get<TitleAndDataTableScoreMonth>(`${this.url}assignment/allMonthScore/${month}`);
  }

  public postLogin(login: LoginDTO): Observable<number> {
    return this.http.post<number>(`${this.url}login`, login);
  }

  public firedEmployee(employee: number):Observable<boolean> {
    return this.http.get<boolean>(`${this.url}employee/fired/${employee}`);
  }

  public getFiredEmployee():Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}employee/fired`);
  }

}
