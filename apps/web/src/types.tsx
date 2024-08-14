import { application } from '@full-stack/authorization';

export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  exact?: boolean;
  pathCompare?: string;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  show?: boolean;
};

export type SideNavProps = {
  app: { user: application.User };
};

export type ISideNav = (props: SideNavProps) => SideNavItem[];
