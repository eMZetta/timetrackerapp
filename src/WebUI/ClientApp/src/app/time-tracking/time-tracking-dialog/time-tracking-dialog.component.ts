import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {BookingType} from "../../web-api-client";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-time-tracking-dialog',
  templateUrl: './time-tracking-dialog.component.html',
})
export class TimeTrackingDialogComponent {
  form: FormGroup;
  bookingTypes: BookingType[] = [];

  constructor(
    public dialogRef: MatDialogRef<TimeTrackingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.bookingTypes = this.data.bookingTypes;
  }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.data.id),
      startOfRecord: new FormControl(this.data.startOfRecord ? new Date(this.data.startOfRecord) : new Date(), [Validators.required]),
      endOfRecord: new FormControl(this.data.endOfRecord ? new Date(this.data.endOfRecord) : new Date(new Date().setMinutes(new Date().getMinutes() + 1)), [Validators.required]),
      shortDescription: new FormControl(this.data.shortDescription, [Validators.required]),
      bookingTypeId: new FormControl(this.data.bookingTypeId ? this.data.bookingTypeId : 0, [Validators.required])  // default value = 0
    }, this.dateValidation);
  }

  dateValidation(group: FormGroup) {
    const start = new Date(group.controls.startOfRecord.value);
    const end = new Date(group.controls.endOfRecord.value);

    return start <= end ? null : { datesInvalid: true };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
