import { IconAward, IconBrandSpeedtest, IconShoppingCart, IconUsers } from '@tabler/icons-react';
import { MenuLinks } from '../models';

export const myMenus: MenuLinks.SidebarLinks[] = [
  {
    label: 'Dashboard',
    icon: IconBrandSpeedtest,
    link: '/',
  },
  {
    label: 'Employees',
    icon: IconUsers,
    link: '/employees',
  },
];
