import { LeftMenuItemId } from '@shared/modules/left-menu-admin/constants';
import { UserType } from '@enums/user-type.enum';


export interface LeftMenuItem {
  id: LeftMenuItemId;
  nameKey: string;
  icon: string;
  link: string;
  linkOptions: boolean;
  userTypes: UserType[];
  featureIsAvailable: boolean;
  authRequired: boolean;
}
