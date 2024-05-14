import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Month } from '../../model/month';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { BdQuerysService } from '../../services/bd-querys.service';
import { ScoreEmployeSumDTO } from '../../model/score-employe-sum-dto';
import { CommonModule } from '@angular/common';
import { Jobperformance } from '../../model/jobperformance';

@Component({
  selector: 'app-dialog-order-list',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions, MatTableModule, MatFormFieldModule, MatSelectModule, MatButtonModule, FormsModule],
  templateUrl: './dialog-order-list.component.html',
  styleUrl: './dialog-order-list.component.scss'
})
export class DialogOrderListComponent implements OnInit {

  displayedColumns: string[] = ['registrationDate', 'score'];
  dataSource: ScoreEmployeSumDTO[] = [];
  months: Month[] = [];
  selectedMonth: number = 0;

  constructor(private dbservice: BdQuerysService, @Inject(MAT_DIALOG_DATA) public jobperformance: Jobperformance) {
  }

  ngOnInit(): void {

    this.fillMonths();
    this.selectedMonth = new Date().getMonth() + 1;

    this.loadTable();

  }
  // { num: 1, name: "Januar" },
  fillMonths() {
    this.months.push({ num: 1, name: "Januar" }, { num: 2, name: "Februar" }, { num: 3, name: "Mart" }, 
    { num: 4, name: "April" }, { num: 5, name: "Maj" }, { num: 6, name: "Juni" }, { num: 6, name: "Juli" }, 
    { num: 6, name: "August" }, { num: 6, name: "Septembar" }, { num: 6, name: "Oktobar" }, { num: 6, name: "Novembar" }, { num: 6, name: "Decembar" })
  }

  loadTable() {
    if (this.jobperformance) {
      this.dbservice.getScoreByEmployeeMonth(this.jobperformance.employeeId, this.selectedMonth).subscribe(d => {
        this.dataSource = d;
      });
    }
  }

}
