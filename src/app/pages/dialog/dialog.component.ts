import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ElementFormComponent } from '../element-form/element-form.component';
import { MatTableModule } from '@angular/material/table';
import { BdQuerysService } from '../../services/bd-querys.service';
import { Element } from '../../model/element';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogClose, MatDialogTitle, ElementFormComponent, MatTableModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {

  displayedColumns: string[] = ['Num', 'name', 'material', 'length', 'height', 'width', 'quantity', 'assigned'];
  dataSource: Element[] = [];
  nodata=false;

  constructor(private bdService: BdQuerysService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {       
    if (this.data) {
      // console.log(this.data);
      this.bdService.getElementsByOrder(this.data).subscribe(o=>{
        if(o.length>0){           
          this.dataSource = o;
        }else{
          this.nodata = true;
        }
      })
      
    }
  }

}



