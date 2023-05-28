import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private numberOfClicks = 0;
  registerClick() {
    console.log(`Number of Clicks: ${++this.numberOfClicks}`);
  }
}
