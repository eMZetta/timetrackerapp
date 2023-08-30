import {Component, Inject, OnInit} from '@angular/core';
import { TimeTrackingService } from './time-tracking.service';
import { TimeTracking } from './time-tracking.model';
import {TimeTrackingDialogComponent} from "./time-tracking-dialog/time-tracking-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BookingType} from "../web-api-client";
import {BookingTypeService} from "./booking-type.service";
import {DurationPipe} from "./shared/duration.pipe";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBar, MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.css']
})
export class TimeTrackingComponent implements OnInit {
  protected readonly DurationPipe = DurationPipe;

  timeTrackings: TimeTracking[] = [];
  bookingTypes: BookingType[] = [];
  isLoading: boolean = true;

  constructor(
    private timeTrackingService: TimeTrackingService,
    private bookingTypeService: BookingTypeService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DEFAULT_OPTIONS) private defaultSnackBarOptions: MatSnackBarConfig) {
    this.defaultSnackBarOptions.duration = 3000;
    this.defaultSnackBarOptions.horizontalPosition = 'center';
    this.defaultSnackBarOptions.verticalPosition = 'top'; // todo configure snackbar in global configuration
  }
  async ngOnInit() {
    this.bookingTypeService.getAll().subscribe(data => {
      this.bookingTypes = data;
    });
    this.loadTimeTrackings();
  }

  openDialog(timeTracking?: TimeTracking): void {
    const dialogRef = this.dialog.open(TimeTrackingDialogComponent, {
      width: '400px',
      data: {
        ...timeTracking || {},
        bookingTypes: this.bookingTypes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.timeTrackingService.put(result.id, result).subscribe(() => {
            this.loadTimeTrackings();
          });
        } else {
          result.id = this.nextId;
          this.timeTrackingService.post(result).subscribe(() => {
            this.loadTimeTrackings();
          });
        }
        this.snackBar.open('Die Buchung wurde gespeichert.');
      }
    });
  }

  deleteTimeTracking(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.timeTrackingService.delete(id).subscribe(() => {
          this.loadTimeTrackings();
          this.snackBar.open('Die Buchung wurde entfernt.');
        });
      }
    });
  }

  private loadTimeTrackings(): void {
    this.timeTrackingService.getAll().subscribe(data => {
      this.timeTrackings = data.sort((a, b) => new Date(a.startOfRecord).getTime() - new Date(b.startOfRecord).getTime());
      this.isLoading = false;
    });
  }

  get timeTotals(): { [key: number]: number } {
    let totals = [0, 0, 0, 0, 0];

    this.timeTrackings.forEach(tracking => {
      if (!totals[tracking.bookingTypeId]) {
        totals[tracking.bookingTypeId] = 0;
      }
      totals[tracking.bookingTypeId] += new Date(tracking.endOfRecord).getTime() - new Date(tracking.startOfRecord).getTime();
    });

    return totals;
  }

  objectKeys(obj: any): Array<string> {
    return Object.keys(obj);
  }

  mapBookingType(id: number): string {
    const bookingType = this.bookingTypes.find(bt => bt.bookingTypeId === id);
    return bookingType ? bookingType.description : 'Unknown';
  }

  differenceInMillis(start: Date, end: Date): number {
    return new Date(end).getTime() - new Date(start).getTime();
  }

  get nextId(): number {
    if (this.timeTrackings.length == 0) {
      return 0;
    }
    return this.timeTrackings.sort((a, b) => b.id - a.id)[0].id + 1;
  }
}
