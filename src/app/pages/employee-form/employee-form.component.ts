import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Employee } from '../../model/employee';
import { BdQuerysService } from '../../services/bd-querys.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {

  hide = true;

  employee: Employee = {
    name: "",
    password:"",
    active: true
  }

  constructor(private bdService: BdQuerysService) { }

  saveEmployee() {    
    this.bdService.saveEmployee(this.employee).subscribe(e => {
      alert("Saved");
      this.employee.name = "";
      this.employee.id = undefined;
      this.employee.password = "";
      this.employee.active = true;
    });
  }

}
