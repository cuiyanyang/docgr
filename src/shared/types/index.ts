import { UserConfig as ViteConfiguration } from 'vite';

export type NavItemWidthLink = {
  text: string;
  link: string;
};

export interface SideBar {
  [path: string]: SideBarGroup;
}

export interface SideBarGroup {
  text: string;
  items: SideBarItems[];
}

export type SideBarItems = {
  text: string;
  link: string;
};

export interface Footer {
  message: string;
}

export interface ThemeConfig {
  nav?: NavItemWidthLink[];
  sidebar?: SideBar;
  footer?: Footer;
}

export interface UserConfig {
  title?: string;
  description?: string;
  themeConfig?: ThemeConfig;
  vite?: ViteConfiguration;
}
