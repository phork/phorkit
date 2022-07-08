import React, { Fragment } from 'react';
import { Theme } from 'types';
import { ThemeColors, themes } from 'config/themes';

type ColorLooperItem = React.ReactElement;

export type ColorLooperProps = {
  exclude?: string[];
  group: 'primary' | 'neutral' | 'state' | 'transparent';
  render: (props: { id: string; color: string }) => ColorLooperItem;
  themeId: Theme;
};

export function ColorLooper({ exclude, render, themeId, group = 'primary' }: ColorLooperProps) {
  const pattern = {
    neutral: /^color-((BG|FG)([0-9]+))$/,
    primary: /^color-((P)([0-9]+))$/,
    /* this is a better state regex but safari doesn't support negative look-behinds
    state: /^color-((accent|success|warning|danger)-?(.*)(?<!contrast)(?<!O[0-9]+))$/, */
    state: /^color-(accent|success|warning|danger)$/,
    transparent: /^color-((.+)-O([0-9]+))$/,
  }[group];

  if (!pattern) {
    throw new Error('Missing or invalid group');
  }

  const items: ColorLooperItem[] = Object.keys(themes[themeId]).reduce((acc, prop: string) => {
    if (!exclude?.includes(prop)) {
      const matches = prop.match(pattern);
      if (matches && matches[1]) {
        acc.push(render({ id: matches[1], color: themes[themeId][prop as keyof ThemeColors] as string }));
      }
    }
    return acc;
  }, [] as ColorLooperItem[]);

  // eslint-disable-next-line react/jsx-fragments
  return <Fragment>{items}</Fragment>;
}

ColorLooper.displayName = 'ColorLooper';
