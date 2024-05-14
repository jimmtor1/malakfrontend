import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Employee } from '../../model/employee';
import { BdQuerysService } from '../../services/bd-querys.service';

@Component({
  selector: 'app-fired-employee',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './fired-employee.component.html',
  styleUrl: './fired-employee.component.scss'
})
export class FiredEmployeeComponent {

  displayedColumns: string[] = ['id', 'name'];
  employee: Employee[] = []
  dataSource = new MatTableDataSource(this.employee);

  constructor(private bdService: BdQuerysService){}

  ngOnInit(): void {
    this.getFiredEmployee();
  }

  getFiredEmployee(){
    this.bdService.getFiredEmployee().subscribe(o => {
      this.dataSource = new MatTableDataSource(o);
    });
  }



}
