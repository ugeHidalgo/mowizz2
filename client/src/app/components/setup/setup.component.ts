import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from 'src/app/animations';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  animations: [ slideInDownAnimation ]
})
export class SetupComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  constructor() { }

  ngOnInit() {
  }

  onClickRefresh() {
  }

  onClickSave() {
  }

}
