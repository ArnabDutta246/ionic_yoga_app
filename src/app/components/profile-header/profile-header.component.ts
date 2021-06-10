import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/session/session.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss'],
})
export class ProfileHeaderComponent implements OnInit {
  sessionData: any;
  greetings: string;
  constructor(private session: SessionService) {
    this.sessionData = this.session.peek();
  }

  ngOnInit() {
    this.setGreetings();
  }
  ionViewWillEnter() {
    this.setGreetings();
  }

  setGreetings() {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      this.greetings = 'Good morning';
    } else if (curHr < 18) {
      this.greetings = 'Good afternoon';
    } else {
      this.greetings = 'Good evening';
    }
  }
}
