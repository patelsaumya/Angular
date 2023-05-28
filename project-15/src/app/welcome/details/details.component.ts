import { Component } from '@angular/core';
import {AnalyticsService} from "../../shared/analytics.service";
import {HighlightDirective} from "../../shared/highlight.directive";

// Standalone Component
@Component({
  standalone: true,
  imports: [
    HighlightDirective
  ],
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  // providers: [
  //   AnalyticsService // Every Component get its own instance of the Service
  // ]
})
export class DetailsComponent {
  constructor(private analyticsService: AnalyticsService) {}

  onClick() {
    this.analyticsService.registerClick();
  }
}
