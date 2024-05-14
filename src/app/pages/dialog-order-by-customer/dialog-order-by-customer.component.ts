import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Order } from '../../model/order';
import { BdQuerysService } from '../../services/bd-querys.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialog-order-by-customer',
  standalone: true,
  imports: [CommonModule,MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions, MatTableModule, MatButtonModule, MatIcon],
  templateUrl: './dialog-order-by-customer.component.html',
  styleUrl: './dialog-order-by-customer.component.scss'
})
export class DialogOrderByCustomerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'elements'];
  dataSource: Order[] = [];

  constructor(private dbservice: BdQuerysService, @Inject(MAT_DIALOG_DATA) public idcustomer: number, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.idcustomer) {
      this.dbservice.getOrderByCustomer(this.idcustomer).subscribe(c => {
        this.dataSource = c;
      });
    }
  }

  openDialog(id: string) {
    this.dialog.open(DialogComponent, {
      data: id
    });
  }

}
