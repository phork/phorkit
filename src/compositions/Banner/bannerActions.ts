import { BannerItemType } from './types';

export enum bannerActions {
  SET = 'SET',
  DELETE = 'DELETE',
  CLEAR = 'CLEAR',
}

export type BannerStateActionSet = {
  type: bannerActions.SET;
  id: string;
  value: BannerItemType;
};

export type BannerStateActionDelete = {
  type: bannerActions.DELETE;
  id: string;
};

export type BannerStateActionClear = {
  type: bannerActions.CLEAR;
};

export type BannerStateAction = BannerStateActionSet | BannerStateActionDelete | BannerStateActionClear;
