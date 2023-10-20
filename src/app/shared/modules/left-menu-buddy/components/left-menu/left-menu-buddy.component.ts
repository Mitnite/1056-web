import { Component, Inject, OnInit } from '@angular/core';
import { LeftMenuItemId } from '@shared/modules/left-menu-buddy/constants';

import { UserType } from '@enums/user-type.enum';
import { LeftMenuItem } from '@shared/modules/left-menu-buddy/types/left-menu-item.interface';
import { DOCUMENT } from '@angular/common';
import { LeftMenuService } from '@shared/modules/left-menu-buddy/services/left-menu.service';

@Component({
  selector: 'app-left-menu-buddy',
  templateUrl: './left-menu-buddy.component.html',
  styleUrls: ['./left-menu-buddy.component.scss']
})
export class LeftMenuBuddyComponent implements OnInit {

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
    //fill="currentColor"
    {
      id: LeftMenuItemId.MY_STUDENTS,
      nameKey: 'My students',
      icon: 'student',
      link: 'my_students',
      linkOptions: true,
      userTypes: [],
      featureIsAvailable: true,
      authRequired: false,
    },
    {
      id: LeftMenuItemId.MY_PROFILE,
      nameKey: 'My profile',
      icon: 'home',
      link: 'profile',
      linkOptions: true,
      userTypes: [],
      featureIsAvailable: true,
      authRequired: false,
    },
    {
      id: LeftMenuItemId.EDIT_PROFILE,
      nameKey: 'Edit my profile',
      icon: 'edit',
      link: 'edit_profile',
      linkOptions: true,
      userTypes: [],
      featureIsAvailable: true,
      authRequired: false,
    },
    {
      id: LeftMenuItemId.BUDDY_MANUAL,
      nameKey: 'Buddy manual',
      icon: 'manual',
      link: 'buddy_manual',
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

