import { Component, Injector, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BdQuerysService } from '../../services/bd-querys.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../../model/order';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { DialogOrderListComponent } from '../dialog-month-list/dialog-order-list.component';
import { DialogFormScoreComponent } from '../dialog-form-score/dialog-form-score.component';
import { Jobperformance } from '../../model/jobperformance';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-jobperformance',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatSelectModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './jobperformance.component.html',
  styleUrl: './jobperformance.component.scss'
})
export class JobperformanceComponent implements OnInit {

  displayedColumns: string[] = ['id', 'form', 'name', 'average1', 'average2', 'average3', 'info', 'fired'];
  jobperformance: Jobperformance[] = []
  dataSource = new MatTableDataSource(this.jobperformance);

  month: string[] = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
  month1: number;
  month2: number;
  month3: number;

  orders: Order[] = [];
  selectedOrder: string = "";

  constructor(private bdService: BdQuerysService, public dialog: MatDialog, private injector: Injector) {

    this.month1 = new Date().getMonth();
    this.month2 = this.month1 - 1 < 0 ? 12 : this.month1 - 1;
    this.month3 = this.month2 - 1 < 0 ? 12 : this.month2 - 1;

  }

  ngOnInit(): void {

    this.updateTable();

    this.bdService.getOrderList().subscribe(o => {
      this.orders = o;
    });


  }

  openDialog(jobperformance: Jobperformance) {
    this.dialog.open(DialogOrderListComponent, {
      data: jobperformance
    });
  }

  openDialog2(jobperformance: Jobperformance) {
    const dialogRef = this.dialog.open(DialogFormScoreComponent, {
      data: jobperformance,
      // disableClose: true,
      injector: this.injector,
    });

    dialogRef.afterClosed().subscribe(x => this.updateTable());

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateTable() {
    this.bdService.getScoreAvgByEmployeeLast3Months().subscribe(e => {
      this.dataSource = new MatTableDataSource(e);
    })
  }

  fired(jobperformance: Jobperformance) {

    const userConfirmed = confirm("Are you sure?");
    if (userConfirmed) {
      this.bdService.firedEmployee(jobperformance.employeeId).subscribe(d => {
        this.updateTable();
      });
    }

  }


}
