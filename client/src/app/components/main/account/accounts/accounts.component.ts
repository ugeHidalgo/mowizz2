import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from 'src/app/animations';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class AccountsComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  constructor() { }

  ngOnInit() {

  }

}
