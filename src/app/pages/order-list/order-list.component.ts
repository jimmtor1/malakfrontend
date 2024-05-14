import { Component, Inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { BdQuerysService } from '../../services/bd-querys.service';
import { Order } from '../../model/order';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { RoleService } from '../../services/role.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})

export class OrderListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'customer', 'elements', 'approve', 'delete'];
  dataSource: Order[] = [];
  role: string;

  constructor(private bdService: BdQuerysService, public dialog: MatDialog, private roleService: RoleService) {
    this.role = this.roleService.getRole();

    if (this.role != "admin") {
      this.displayedColumns = ['id', 'date', 'customer', 'elements'];
    }

  }

  ngOnInit(): void {
    this.getCustomList();
  }

  getCustomList() {
    this.bdService.getOrderList().subscribe(o => {
      this.dataSource = o;
    });
  }


  archive(id: number) {
    const c = confirm("Jeste li sigurni da želite izbrisatu narudžbu broj: " + id + " ?");
    if (c) {
      this.bdService.deleteOrder(id).subscribe(x => {
        this.getCustomList();
      });
    }
  }

  approve(id: number) {
    this.bdService.changeStatusOrder(id, 2).subscribe(x => {
      this.getCustomList();
    });
  }

  openDialog(id: string) {
    this.dialog.open(DialogComponent, {
      data: id//{ idorder: id }
    });
  }

}
