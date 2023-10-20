import { Component, Inject, OnInit } from '@angular/core';
import { LeftMenuItemId } from '@shared/modules/left-menu-admin/constants';

import { UserType } from '@enums/user-type.enum';
import { LeftMenuItem } from '@shared/modules/left-menu-admin/types/left-menu-item.interface';
import { DOCUMENT } from '@angular/common';
import { LeftMenuService } from '@shared/modules/left-menu-admin/services/left-menu.service';

@Component({
  selector: 'app-left-menu-admin',
  templateUrl: './left-menu-admin.component.html',
  styleUrls: ['./left-menu-admin.component.scss']
})
export class LeftMenuAdminComponent implements OnInit {

  private readonly LEFT_MENU_STATE_KEY = 'left-menu-state';
  private readonly LEFT_MENU_STATE_VALUE = 'closed';
  public readonly menuIteIds = LeftMenuItemId;

  public currentHoverId: LeftMenuItemId = null;
  public menuIsOpen = true;

  public firstBlockMenu: LeftMenuItem[] = [

    {
      id: LeftMenuItemId.DASHBOARD,
      nameKey: 'Dashboard',
      icon: 'dashboard',
      link: 'dashboard',
      linkOptions: true,
      userTypes: [],
      featureIsAvailable: true,
      authRequired: false,
    },
    {
      id: LeftMenuItemId.MANAGEMENT,
      nameKey: 'Buddy Management',
      icon: 'management',
      link: 'management',
      linkOptions: false ,
      userTypes: [],
      featureIsAvailable: true,
      authRequired: false,
    },
    {
      id: LeftMenuItemId.SEMESTER,
      nameKey: 'Semester overview',
      icon: 'semester',
      link: 'semester_overview',
      linkOptions: true,
      userTypes: [],
      featureIsAvailable: true,
      authRequired: false,
    },
    {
      id: LeftMenuItemId.GET_HELP,
      nameKey: 'Get help',
      icon: 'getHelp',
      link: 'help',
      linkOptions: true,
      userTypes: [],
      featureIsAvailable: true,
      authRequired: false,
    },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private leftMenuService: LeftMenuService,
  ) {
    const menuState = this.getMenuStateFromStorage();
    this.menuIsOpen = menuState !== this.LEFT_MENU_STATE_VALUE;
    this.updateMenuStateCSSClass(this.menuIsOpen);

    this.leftMenuService.toggleMenu$
      .subscribe(
        () => this.toggleMenu(),
      );
  }

  ngOnInit() { }

  mouseEnter($event: any, id: LeftMenuItemId) {
    this.currentHoverId = id;
  }

  mouseLeave($event: any) {
    this.currentHoverId = null;
  }

  toggleMenu() {
    this.menuIsOpen = !this.menuIsOpen;
    this.updateMenuStateCSSClass(this.menuIsOpen);
    this.saveMenuStateToStorage(this.menuIsOpen);
  }

  private saveMenuStateToStorage(menuIsOpen: boolean) {
    try {
      if (menuIsOpen) {
        localStorage.removeItem(this.LEFT_MENU_STATE_KEY);
      } else {
        localStorage.setItem(this.LEFT_MENU_STATE_KEY, this.LEFT_MENU_STATE_VALUE);
      }
    } catch (e) {
      console.error(e);
    }
  }

  private getMenuStateFromStorage() {
    try {
      return localStorage.getItem(this.LEFT_MENU_STATE_KEY);
    } catch (e) {
      return '';
    }
  }

  private updateMenuStateCSSClass(menuIsOpen: boolean) {
    if (menuIsOpen) {
      this.document.body.classList.add('left-menu-is-open');
    } else {
      this.document.body.classList.remove('left-menu-is-open');
    }
  }

}

