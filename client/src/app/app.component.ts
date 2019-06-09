import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from './globals/globals.service';
import { SetupService } from './services/setup/setup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'MoWizz 2';

  constructor (
    protected globals: GlobalsService,
    protected setupService: SetupService,
    private router: Router
    ) {
    const me = this,
          username = me.globals.getUserNameFromLocalStorage();

    me.globals.setUser(username);
    me.setupService.getSetup().subscribe(
      (setup) => {
        me.globals.setup = setup;
      }
    );
  }

  onClick(link) {
    this.router.navigate([link]);
  }

  logout() {
    const me = this;

    me.globals.clearUser();
    me.globals.removeUserDataFromLocalStorage();
    me.router.navigate(['/']);
  }
}
