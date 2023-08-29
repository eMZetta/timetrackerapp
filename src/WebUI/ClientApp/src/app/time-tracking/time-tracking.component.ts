import { Component, OnInit } from '@angular/core';
import { TimeTrackingService } from './time-tracking.service';
import { TimeTracking } from './time-tracking.model';
import {TimeTrackingDialogComponent} from "./time-tracking-dialog/time-tracking-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BookingType} from "../web-api-client";
import {BookingTypeService} from "./booking-type.service";
import {DurationPipe} from "./shared/duration.pipe";

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  styleUrls: ['./time-tracking.component.css']
})
export class TimeTrackingComponent implements OnInit {
  protected readonly DurationPipe = DurationPipe;

  timeTrackings: TimeTracking[] = [];
  bookingTypes: BookingType[] = [];
  constructor(
    private timeTrackingService: TimeTrackingService,
    private bookingTypeService: BookingTypeService,
    public dialog: MatDialog) { }
  async ngOnInit() {
    this.bookingTypeService.getAll().subscribe(data => {
      this.bookingTypes = data;
    });
    this.timeTrackingService.getAll().subscribe(data => {
      this.timeTrackings = data;
    });
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
        // alert("Die Buchung wurde gespeichert.");
      }
    });
  }

  deleteTimeTracking(id: number): void {
    this.timeTrackingService.delete(id).subscribe(() => {
      // alert("Die Buchung wurde entfernt.");
      this.loadTimeTrackings();
    });
  }

  private loadTimeTrackings(): void {
    this.timeTrackingService.getAll().subscribe(data => {
      this.timeTrackings = data;
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

  getBookingTypeDescription(id: number): string {
    // In einer echten App würden Sie wahrscheinlich einen Service verwenden,
    // um die Beschreibung basierend auf der ID von einem API-Endpunkt oder einem Store zu erhalten.
    // Für diese Demo verwenden wir eine einfache Zuordnung:
    const descriptions: { [key: number]: string } = {
      0: 'Präsenzzeit',
      1: 'Pause',
      2: 'Krankheit oder Unfall',
      3: 'bezahlte Absenz',
      4: 'unbezahlte Absenz'
    };

    return descriptions[id] || 'Unbekannter Typ';
  }

  mapBookingType(id: number): string {
    console.log(this.bookingTypes);
    const bookingType = this.bookingTypes.find(bt => bt.bookingTypeId === id);
    console.log(this.bookingTypes);
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
