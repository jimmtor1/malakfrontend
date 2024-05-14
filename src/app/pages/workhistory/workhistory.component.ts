import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BdQuerysService } from '../../services/bd-querys.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-workhistory',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './workhistory.component.html',
  styleUrl: './workhistory.component.scss'
})

export class WorkhistoryComponent implements OnInit {

  displayedColumns: string[] = ['ID', 'Ime i prezime'];
  object: Object[][] = [];
  dataSource = new MatTableDataSource(this.object);

  constructor(private bdService: BdQuerysService) { }

  ngOnInit(): void {

    this.bdService.getAllScoresThisMonth(new Date().getMonth() + 1).subscribe(d => {
      this.displayedColumns = this.displayedColumns.concat(d.dates);
      this.object = d.scores;
      this.dataSource = new MatTableDataSource(this.object);
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  print() {
    this.generatePDF();
  }

  generatePDF() {
    const doc = new jsPDF();

    // doc.text("Nalog: " + orderid, 14, 20);
    // doc.text(date.toString().replaceAll("-", "."), 50, 20);
    // doc.text("Kupac: " + customer, 14, 28);

    autoTable(doc, {
      head: [this.displayedColumns],
      body: this.object,//elements.map(obj => [obj.name!, obj.material!, obj.length!, obj.width!, obj.height!, obj.quantity!]),
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


}


