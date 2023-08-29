
export class TimeTracking {
  id: number;
  startOfRecord: Date;
  endOfRecord: Date;
  shortDescription: string;
  bookingTypeId: number;

  get duration(): number {
    return new Date(this.endOfRecord).getTime() - new Date(this.startOfRecord).getTime();
  }
}
