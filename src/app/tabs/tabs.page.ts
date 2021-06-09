import { Component } from '@angular/core';
import { AppMenus } from '../models/app-menus/app-menus';
import { Menus } from '../shared/app-menus/app-menus';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  appMenus: AppMenus[] = Menus;
  constructor() {}
}
