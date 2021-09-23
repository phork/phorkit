import { BannerWithContextItemType } from './BannerFromContext';

export enum bannerActions {
  SET = 'SET',
  DELETE = 'DELETE',
  CLEAR = 'CLEAR',
}

export type BannerStateActionSet = {
  type: bannerActions.SET;
  id: string;
  value: BannerWithContextItemType;
};

export type BannerStateActionDelete = {
  type: bannerActions.DELETE;
  id: string;
};

export type BannerStateActionClear = {
  type: bannerActions.CLEAR;
};

export type BannerStateAction = BannerStateActionSet | BannerStateActionDelete | BannerStateActionClear;
