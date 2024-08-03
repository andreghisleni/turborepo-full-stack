export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  exact?: boolean;
  pathCompare?: string;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};
