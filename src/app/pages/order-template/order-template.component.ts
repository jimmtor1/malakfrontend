import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Element } from '../../model/element';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormElementComponent } from '../../common/form-element/form-element.component';

const ELEMENT_DATA: Element[] = [
  {name: "Greda", material: 'hrast', length: 2.18, width: 0.16, height: 0.09, quantity: 200, order:{id:""}},
  {name: "Greda", material: 'hrast', length: 1.98, width: 0.16, height: 0.09, quantity: 200, order:{id:""}},
  {name: "Greda", material: 'hrast', length: 1.78, width: 0.16, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Greda", material: 'hrast', length: 1.58, width: 0.16, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Dio noge", material: 'hrast', length: 1.56, width: 0.08, height: 0.02, quantity: 200, order:{id:""}},
  {name: "Dio noge", material: 'hrast', length: 1.36, width: 0.08, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Dio noge", material: 'hrast', length: 1.16, width: 0.08, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Pakna", material: 'hrast', length: 0.31, width: 0.08, height: 0.02, quantity: 400, order:{id:""}},
  {name: "Nosac uzglavlja", material: 'hrast', length: 0.65, width: 0.04, height: 0.04, quantity: 200, order:{id:""}},
  {name: "Srednja letva", material: 'J/S', length: 1.982, width: 0.065, height: 0.02, quantity: 100, order:{id:""}},
  {name: "Ploca nocnika", material: 'hrast', length: 0.33, width: 0.3, height: 0.05, quantity: 100, order:{id:""}},
  {name: "Okov 0583", material: '/', length: 0, width: 0, height: 0, quantity: 100, order:{id:""}},  
];

const ELEMENT_DATA2: Element[] = [
  {name: "Greda", material: 'J/S', length: 2.18, width: 0.16, height: 0.09, quantity: 80, order:{id:""}},
  {name: "Greda", material: 'hrast', length: 2.18, width: 0.16, height: 0.09, quantity: 40, order:{id:""}},
  {name: "Greda", material: 'J/S', length: 1.98, width: 0.16, height: 0.09, quantity: 40, order:{id:""}},
  {name: "Greda", material: 'hrast', length: 1.98, width: 0.16, height: 0.09, quantity: 20, order:{id:""}},
  {name: "Greda", material: 'J/S', length: 1.78, width: 0.16, height: 0.09, quantity: 40, order:{id:""}},
  {name: "Greda", material: 'hrast', length: 1.78, width: 0.16, height: 0.09, quantity: 20, order:{id:""}},
  {name: "Greda", material: 'J/S', length: 1.08, width: 0.16, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Greda", material: 'J/S', length: 0.98, width: 0.16, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Greda", material: 'hrast', length: 0.98, width: 0.16, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 2, width: 0.19, height: 0.02, quantity: 0, order:{id:""}},                          
  {name: "Naslon", material: 'hrast', length: 2, width: 0.19, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.8, width: 0.19, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.8, width: 0.19, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.6, width: 0.19, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.6, width: 0.19, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 2, width: 0.19, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.8, width: 0.19, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.6, width: 0.19, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 2, width: 0.42, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 2, width: 0.42, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.8, width: 0.42, height: 0.02, quantity: 10, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.8, width: 0.42, height: 0.02, quantity: 10, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.6, width: 0.42, height: 0.02, quantity: 10, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.6, width: 0.42, height: 0.02, quantity: 10, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 0.8, width: 0.42, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 0.8, width: 0.42, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.8, width: 0.38, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.8, width: 0.38, height: 0.02, quantity: 0, order:{id:""}},  
  {name: "Naslon", material: 'J/S', length: 1.6, width: 0.38, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.6, width: 0.38, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.8, width: 0.35, height: 0.02, quantity: 10, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.8, width: 0.35, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 1.6, width: 0.35, height: 0.02, quantity: 10, order:{id:""}},
  {name: "Naslon", material: 'hrast', length: 1.6, width: 0.35, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Naslon", material: 'J/S', length: 0.9, width: 0.35, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Noga kreveta", material: 'J/S', length: 1.98, width: 0.28, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Noga kreveta", material: 'hrast', length: 1.98, width: 0.28, height: 0.04, quantity: 20, order:{id:""}},
  {name: "Noga krevetada", material: 'J/S', length: 1.78, width: 0.28, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Noga kreveta", material: 'hrast', length: 1.78, width: 0.28, height: 0.04, quantity: 20, order:{id:""}},
  {name: "Noga kreveta", material: 'J/S', length: 0.33, width: 0.16, height: 0.09, quantity: 80, order:{id:""}},
  {name: "Noga kreveta", material: 'hrast', length: 0.33, width: 0.16, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Noga kreveta", material: 'J/S', length: 0.35, width: 0.1, height: 0.09, quantity: 80, order:{id:""}},
  {name: "Noga kreveta", material: 'hrast', length: 0.35, width: 0.1, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Noga kreveta", material: 'J/S', length: 0.36, width: 0.08, height: 0.08, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'J/S', length: 1.35, width: 0.28, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'hrast', length: 1.35, width: 0.28, height: 0.025, quantity: 20, order:{id:""}},
  {name: "Vezac nogu", material: 'J/S', length: 1.925, width: 0.1, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'hrast', length: 1.925, width: 0.1, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'J/S', length: 1.725, width: 0.1, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'hrast', length: 1.725, width: 0.1, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'J/S', length: 1.525, width: 0.1, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'hrast', length: 1.525, width: 0.1, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'J/S', length: 1.84, width: 0.08, height: 0.08, quantity: 0, order:{id:""}},
  {name: "Vezac nogu", material: 'J/S', length: 1.64, width: 0.08, height: 0.08, quantity: 0, order:{id:""}},
  {name: "Nosac uzglavlja", material: 'J/S', length: 0.53, width: 0.09, height: 0.04, quantity: 80, order:{id:""}},
  {name: "Nosac uzglavlja", material: 'hrast', length: 0.53, width: 0.04, height: 0.04, quantity: 40, order:{id:""}},
  {name: "Nosac uzglavlja", material: 'hrast', length: 0.5, width: 0.09, height: 0.04, quantity: 0, order:{id:""}},
  {name: "Srednja letva", material: 'J/S', length: 1.982, width: 0.08, height: 0.03, quantity: 40, order:{id:""}},
  {name: "Srednja nogica", material: 'J/S', length: 0.25, width: 0.08, height: 0.39, quantity: 40, order:{id:""}},
  {name: "Ploca nocnika", material: 'J/S', length: 0.55, width: 0.4, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Ploca nocnika", material: 'hrast', length: 0.55, width: 0.4, height: 0.01, quantity: 0, order:{id:""}},
  {name: "Ploca nocnika", material: 'J/S', length: 0.5, width: 0.35, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Ploca nocnika", material: 'Hrast', length: 0.5, width: 0.16, height: 0.02, quantity: 40, order:{id:""}},
  {name: "Stranica nocnika", material: 'J/S', length: 0.38, width: 0.16, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Stranica nocnika", material: 'hrast', length: 0.38, width: 0.16, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Stranica nocnika", material: 'J/S', length: 0.425, width: 0.35, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Stranica nocnika", material: 'hrast', length: 0.425, width: 0.35, height: 0.02, quantity: 80, order:{id:""}},
  {name: "Vezac nocnika", material: 'J/S', length: 0.51, width: 0.15, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Vezac nocnika", material: 'hrast', length: 0.51, width: 0.15, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Vezac nocnika", material: 'J/S', length: 0.45, width: 0.08, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Vezac nocnika", material: 'hrast', length: 0.45, width: 0.08, height: 0.02, quantity: 80, order:{id:""}},
  {name: "Celo nocnika", material: 'J/S', length: 0.55, width: 0.16, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Celo nocnika", material: 'hrast', length: 0.55, width: 0.16, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Celo nocnika", material: 'J/S', length: 0.444, width: 0.18, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Celo nocnika", material: 'hrast', length: 0.444, width: 0.18, height: 0.02, quantity: 40, order:{id:""}},
  {name: "Bocna ladice noc.", material: 'J/S', length: 0.29, width: 0.09, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Bocna ladice noc.", material: 'hrast', length: 1.98, width: 0.29, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Bocna ladice noc.", material: 'J/S', length: 1.98, width: 0.29, height: 0.11, quantity: 0, order:{id:""}},
  {name: "Bocna ladice noc.", material: 'hrast', length: 1.98, width: 0.29, height: 0.11, quantity: 80, order:{id:""}},
  {name: "Prednja-zadnja ladice noc", material: 'J/S', length: 0.468, width: 0.07, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Prednja-zadnja ladice noc", material: 'hrast', length: 0.468, width: 0.07, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Prednja-zadnja ladice noc", material: 'J/S', length: 0.468, width: 0.09, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Prednja-zadnja ladice noc", material: 'hrast', length: 0.468, width: 0.09, height: 0.02, quantity: 80, order:{id:""}},
  {name: "Pod ladice noc", material: 'MDF', length: 0.486, width: 0.29, height: 0.004, quantity: 0, order:{id:""}},
  {name: "Pod ladice noc", material: 'MDF', length: 0.41, width: 0.29, height: 0.004, quantity: 40, order:{id:""}},
  {name: "Leđa noc", material: 'hrast', length: 0.51, width: 0.16, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Leđa noc", material: 'MDF', length: 0.46, width: 0.19, height: 0.004, quantity: 40, order:{id:""}},
  {name: "Ladica noc.sklop", material: 'J/S', length: 0.498, width: 0.29, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Ladica noc.sklop", material: 'hrast', length: 0.498, width: 0.29, height: 0.09, quantity: 0, order:{id:""}},
  {name: "Ladica noc.sklop", material: 'J/S', length: 0.498, width: 0.29, height: 0.01, quantity: 0, order:{id:""}},
  {name: "Ladica noc.sklop", material: 'hrast', length: 0.498, width: 0.29, height: 0.11, quantity: 40, order:{id:""}},
  {name: "Nocnik-sklop", material: 'J/S', length: 0.55, width: 0.4, height: 0.18, quantity: 0, order:{id:""}},
  {name: "Nocnik-sklop", material: 'hrast', length: 0.55, width: 0.4, height: 0.18, quantity: 0, order:{id:""}},
  {name: "Nocnik-sklop", material: 'J/S', length: 0.5, width: 0.35, height: 0.41, quantity: 0, order:{id:""}},
  {name: "Nocnik-sklop", material: 'hrast', length: 0.5, width: 0.35, height: 0.41, quantity: 40, order:{id:""}},
  {name: "Noge-vezac noc.-sklop", material: 'J/S', length: 0, width: 0, height: 0, quantity: 0, order:{id:""}},
  {name: "Noge-vezac noc.-sklop", material: 'hrast', length: 0, width: 0, height: 0, quantity: 0, order:{id:""}},
  {name: "Celo ladice kreveta", material: 'J/S', length: 1.35, width: 0.22, height: 0.02, quantity: 15, order:{id:""}},
  {name: "Celo ladice kreveta", material: 'hrast', length: 1.35, width: 0.22, height: 0.02, quantity: 15, order:{id:""}},
  {name: "Vezac ladice kreveta", material: 'J/S', length: 1.35, width: 0.05, height: 0.02, quantity: 60, order:{id:""}},
  {name: "Vezac ladice kreveta", material: 'hrast', length: 1.35, width: 0.05, height: 0.02, quantity: 60, order:{id:""}},
  {name: "Bocna stranica rama", material: 'J/S', length: 0.65, width: 0.18, height: 0.02, quantity: 30, order:{id:""}},
  {name: "Bocna stranica rama", material: 'hrast', length: 0.65, width: 0.18, height: 0.02, quantity: 30, order:{id:""}},
  {name: "Bocna ladice", material: 'J/S', length: 0.6, width: 0.14, height: 0.015, quantity: 30, order:{id:""}},
  {name: "Bocna ladice", material: 'hrast', length: 0.6, width: 0.14, height: 0.015, quantity: 30, order:{id:""}},
  {name: "Prednja-zadnja ladice kr.", material: 'J/S', length: 1.268, width: 0.125, height: 0.02, quantity: 30, order:{id:""}},
  {name: "Prednja-zadnja ladice kr.", material: 'hrast', length: 1.268, width: 0.125, height: 0.02, quantity: 30, order:{id:""}},
  {name: "Ram ladice", material: 'J/S', length: 1.35, width: 0.65, height: 0.18, quantity: 15, order:{id:""}},
  {name: "Ram ladice", material: 'hrast', length: 1.35, width: 0.65, height: 0.18, quantity: 15, order:{id:""}},
  {name: "Ladica kreveta(sklop)", material: 'J/S', length: 1.298, width: 0.6, height: 0.12, quantity: 15, order:{id:""}},
  {name: "Ladica kreveta(sklop)", material: 'hrast', length: 1.298, width: 0.6, height: 0.12, quantity: 15, order:{id:""}},
  {name: "Pod ladice kreveta", material: 'MDF', length: 1.275, width: 0.5, height: 0.004, quantity: 30, order:{id:""}},
  {name: "Ojacanje-Mia", material: 'J/S', length: 1.95, width: 0.035, height: 0.025, quantity: 40, order:{id:""}},
  {name: "Ojacanje-Laura", material: 'J/S', length: 1.36, width: 0.035, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Ojacanje-Alex", material: 'J/S', length: 1.36, width: 0.035, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Ojacanje-Matus", material: 'J/S', length: 1.32, width: 0.035, height: 0.025, quantity: 40, order:{id:""}},
  {name: "Ojacanje-Bed Y", material: 'J/S', length: 0.96, width: 0.035, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Ojacanje-Matus", material: 'J/S', length: 0.27, width: 0.035, height: 0.025, quantity: 80, order:{id:""}},
  {name: "Ojacanje-Bed Y", material: 'J/S', length: 0.24, width: 0.035, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Ojacanje-Alex", material: 'J/S', length: 0.175, width: 0.035, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Ojacanje-Laura", material: 'J/S', length: 0.175, width: 0.035, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Ojacanje-Bed Y", material: 'J/S', length: 0.16, width: 0.035, height: 0.025, quantity: 0, order:{id:""}},
  {name: "Ojacanje Miky", material: 'J/S', length: 1.27, width: 0.035, height: 0.025, quantity: 40, order:{id:""}},
  {name: "Ojacanje Miky", material: 'J/S', length: 0.14, width: 0.035, height: 0.025, quantity: 80, order:{id:""}},
  {name: "Podnice", material: 'J/S', length: 1.995, width: 0.06, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Podnice", material: 'J/S', length: 1.795, width: 0.06, height: 0.02, quantity: 0, order:{id:""}},
  {name: "Podnice", material: 'J/S', length: 1.595, width: 0.06, height: 0.02, quantity: 0, order:{id:""}},
];


@Component({
  selector: 'app-order-template',
  standalone: true,
  imports: [MatDialogContent, MatTableModule, MatDialogActions, MatButton, MatDialogTitle, MatIcon, MatDialogClose, MatIconButton],
  templateUrl: './order-template.component.html',
  styleUrl: './order-template.component.scss'
})

export class OrderTemplateComponent implements OnInit {

  displayedColumns: string[] = ['Num', 'name', 'material', 'length', 'height', 'width', 'quantity', 'edit'];
  dataSource: Element[] = ELEMENT_DATA;  

  constructor(public dialog: MatDialog, public thisdialogRef: MatDialogRef<OrderTemplateComponent>, @Inject(MAT_DIALOG_DATA) public data: number){

  }

  ngOnInit(): void {
    if(this.data==1){
      this.dataSource = ELEMENT_DATA;
    }else if(this.data==2){
      this.dataSource = ELEMENT_DATA2;
    }
  }



  upload(){
    this.thisdialogRef.close(this.dataSource);
  }

  openEditDilog(element:Element){
    const dialogRef = this.dialog.open(FormElementComponent, {
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {      
      // Aquí puedes manejar la información recibida del diálogo      
      this.editData(result);
     
    });

  }

  editData(element:Element){
    if(element.id){
      this.dataSource[element.id-1] = element;
    }    
  }

}
