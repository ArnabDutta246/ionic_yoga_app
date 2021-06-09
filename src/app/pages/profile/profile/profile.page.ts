import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { User } from 'src/app/models/user/user.model';
import { SessionService } from 'src/app/shared/session/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private sessionData: any;
  private time = moment().format();
  constructor(private session: SessionService) {
    this.getSessionData();
  }

  ngOnInit() {}
  private getSessionData(): void {
    this.sessionData = this.session.peek();
    console.log(this.sessionData);
  }
  private sessionSignOut() {
    this.session.clear();
  }
}
