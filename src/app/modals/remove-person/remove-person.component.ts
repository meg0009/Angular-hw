import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-remove-person',
  templateUrl: './remove-person.component.html',
  styleUrls: ['./remove-person.component.css']
})
export class RemovePersonComponent {

  constructor(
    public dialogRef: MatDialogRef<RemovePersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onOkClick() {
    this.dialogRef.close(true);
  }

  onNoClick() {
    this.dialogRef.close(false);
  }
}
