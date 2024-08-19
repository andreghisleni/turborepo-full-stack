import { application, organization } from '@full-stack/authorization';
import { ReactNode } from 'react';

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
export type SideNavPropsApp = {
  app: { user: application.User };
  org: { user: organization.User };
};

export type ISideNav = (props: SideNavProps) => SideNavItem[];

export type UserAvatarMenuItem = {
  title: string;
  path?: string;
  component?: ReactNode;
};
