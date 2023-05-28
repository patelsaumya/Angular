import {Component, OnInit} from '@angular/core';
import {ServersService} from "./servers.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  public servers: {id: number, name: string, status: string}[] = [];

  constructor(private serversService: ServersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // this.router.navigate(['/servers']);
    // this.router.navigate(['servers'], {
    //   relativeTo: this.route // currently active route (i.e. the route that loaded this component)
    //   // default always the root domain
    // });
    // unlike the routerLink, the navigate method doesn't know on which route you're currently on.
    // routerLink always knows in which component it sits, and therefore it knows what the currently loaded route is.
  }
}
