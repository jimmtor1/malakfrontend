import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BdQuerysService } from '../../services/bd-querys.service';
import { Order } from '../../model/order';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { Element } from '../../model/element';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-production',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatInputModule, MatButtonModule, MatIconModule, MatFormFieldModule],
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss'
})
export class ProductionComponent implements OnInit {

  constructor(private bdService: BdQuerysService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'date', 'customer', 'elements', 'finish', 'print'];
  order: Order[] = []
  dataSource = new MatTableDataSource(this.order);

  ngOnInit(): void {
    this.getApprovedOrderList();
  }

  getApprovedOrderList() {
    this.bdService.getApprovedOrderList().subscribe(o => {
      this.dataSource = new MatTableDataSource(o);
    });
  }

  openDialog(id: string) {
    this.dialog.open(DialogComponent, {
      data: id
    });
  }

  finish(id: number) {
    this.bdService.changeStatusOrder(id, 3).subscribe(x => {
      this.getApprovedOrderList();
    });
  }

  print(order: Order) {
    this.bdService.getElementsByOrder(order.id!).subscribe(o => {
      this.generatePDF(o, order.id!, order.customer?.name!, order.date!);
    });
  }

  generatePDF(elements: Element[], orderid: string, customer: string, date: Date) {
    const doc = new jsPDF();

    doc.text("Nalog: " + orderid, 14, 20);
    doc.text(date.toString().replaceAll("-", "."), 50, 20);
    doc.text("Kupac: " + customer, 14, 28);

    autoTable(doc, {
      head: [['Element', 'Materijal', 'Dužina', 'Širina', 'Visina', 'Kolicina']],
      body: elements.map(obj => [obj.name!, obj.material!, obj.length!, obj.width!, obj.height!, obj.quantity!]),
      startY: 32,
      // Configuraciones adicionales aquí
    });

    // Genera el PDF en un blob
    const pdfBlob = doc.output('blob');

    // Crea una URL para el blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Abre el PDF en una nueva pestaña
    window.open(pdfUrl, '_blank');

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;    
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
