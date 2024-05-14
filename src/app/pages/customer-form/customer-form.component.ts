import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BdQuerysService } from '../../services/bd-querys.service';
import { Customer } from '../../model/customer';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIcon],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
  
  hide = true;

  customer : Customer = {
    name : ""
  }

  constructor(private bdService: BdQuerysService) { }

  saveCustom() {      

    this.bdService.saveCustom(this.customer).subscribe(c => {
      alert("Saved");      
      this.customer.name = "";
      this.customer.id = undefined;
    });
  }

}
