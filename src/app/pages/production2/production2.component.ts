import { Component, OnInit } from '@angular/core';
import { BdQuerysService } from '../../services/bd-querys.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from '../../model/customer';
import { DialogOrderByCustomerComponent } from '../dialog-order-by-customer/dialog-order-by-customer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-production2',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButtonModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './production2.component.html',
  styleUrl: './production2.component.scss'
})
export class Production2Component implements OnInit {

  displayedColumns: string[] = ['id','customer', 'open'];
  customer: Customer[] = []
  dataSource = new MatTableDataSource(this.customer);

  constructor(private bdservice : BdQuerysService, public dialog: MatDialog){}

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.bdservice.getCustomerList().subscribe(o => {
      this.dataSource = new MatTableDataSource(o);
    });
  }

  openDialog(id: string) {
    this.dialog.open(DialogOrderByCustomerComponent, {
      data: id
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 

}
