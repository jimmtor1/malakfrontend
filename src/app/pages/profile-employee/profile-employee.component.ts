import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ScoreEmployeSumDTO } from '../../model/score-employe-sum-dto';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { Month } from '../../model/month';
import { BdQuerysService } from '../../services/bd-querys.service';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-employee',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatFormField, MatLabel, MatSelect, FormsModule, MatOption],
  templateUrl: './profile-employee.component.html',
  styleUrl: './profile-employee.component.scss'
})
export class ProfileEmployeeComponent {

  displayedColumns: string[] = ['registrationDate', 'score'];
  dataSource: ScoreEmployeSumDTO[] = [];
  months: Month[] = [];
  selectedMonth: number = 0;

  constructor(private dbservice: BdQuerysService, private logService : RoleService){}

  ngOnInit(): void {

    this.fillMonths();
    this.selectedMonth = new Date().getMonth() + 1;

    this.loadTable();

  }


  fillMonths() {
    this.months.push({ num: 1, name: "January" }, { num: 2, name: "February" }, { num: 3, name: "March" }, 
    { num: 4, name: "April" }, { num: 5, name: "May" }, { num: 6, name: "June" })
  }

  loadTable() {

    let idemployee = this.logService.getUser();

    if (idemployee) {
      this.dbservice.getScoreByEmployeeMonth(Number(idemployee), this.selectedMonth).subscribe(d => {
        this.dataSource = d;
      });
    }
  }

}
