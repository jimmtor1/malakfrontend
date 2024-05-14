import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatIcon } from '@angular/material/icon';
import { Order } from '../../model/order';
import { BdQuerysService } from '../../services/bd-querys.service';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIcon, MatButtonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  displayedColumns: string[] = ['id', 'date', 'elements'];
  dataSource: Order[] = [];

  constructor(public dialog: MatDialog, private dbservice: BdQuerysService, private logService: RoleService){}

  ngOnInit(): void {

    let idcustomer = this.logService.getUser();

    if (idcustomer) {
      this.dbservice.getOrderByCustomer(Number(idcustomer)).subscribe(c => {
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
