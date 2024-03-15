import { IconAward, IconBrandSpeedtest, IconShoppingCart, IconUsers, IconUsersGroup } from '@tabler/icons-react';
import { MenuLinks } from '../models';

export const myMenus: MenuLinks.SidebarLinks[] = [
  {
    label: 'Dashboard',
    icon: IconBrandSpeedtest,
    link: '/',
  },
  {
    label: 'Departement',
    icon: IconUsersGroup,
    link: '/departement',
  },
];
