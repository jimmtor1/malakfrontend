import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { Element } from '../../model/element';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-element',
  standalone: true,
  imports: [MatDialogContent, MatInputModule, MatDialogActions, MatButton, MatDialogTitle, MatIcon, MatDialogClose, MatIconButton, MatGridList, MatGridTile, MatLabel, FormsModule],
  templateUrl: './form-element.component.html',
  styleUrl: './form-element.component.scss'
})
export class FormElementComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public element: Element, public dialogRef: MatDialogRef<FormElementComponent> ) {  
  }

  save() {
    this.dialogRef.close(this.element);
  }

}
