import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from "@angular/core";

// You don't add @Injectable to the service you want to inject, but,
// to the service where you want to inject something.
@Injectable({
  providedIn: 'root'
  // Services can be loaded lazily by Angular (behind the scenes) and redundant code can be removed automatically. (instead of mentioning in 'providers' in AppModule)
})
export class AccountsService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Test Account',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  statusUpdated = new EventEmitter<string>(); // Cross-Component Communication

  constructor(private loggingService: LoggingService) {
  }

  addAccount(name: string, status: string) {
    this.accounts.push({name: name, status: status});
    this.loggingService.logStatusChange(status);
  }

  updateStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.loggingService.logStatusChange(status);
  }
}
