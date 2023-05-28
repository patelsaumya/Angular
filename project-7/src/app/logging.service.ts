import {Injectable} from "@angular/core";

@Injectable() // recommended to add to all the services.
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
