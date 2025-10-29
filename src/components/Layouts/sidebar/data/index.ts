import * as Icons from "../icons";

// Types for navigation data
export interface SubNavItem {
  title: string;
  url: string;
}

export interface NavItem {
  title: string;
  url?: string;
  icon: any;
  items: SubNavItem[];
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_DATA: NavSection[] = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Post Management",
        url: "/post-management",
        icon: Icons.PostIcon,
        items: [],
      },
      {
        title: "Apartment Management",
        url: "/apartment-management",
        icon: Icons.ApartmentIcon,
        items: [],
      },
      {
        title: "Building Management",
        url: "/building-management",
        icon: Icons.BuildingIcon,
        items: [],
      },
      {
        title: "Subdivision Management",
        url: "/subdivision-management",
        icon: Icons.SubdivisionIcon,
        items: [],
      },
      {
        title: "User Management",
        url: "/user-management",
        icon: Icons.UsersIcon,
        items: [],
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },




];
