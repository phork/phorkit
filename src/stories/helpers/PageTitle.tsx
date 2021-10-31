import React from 'react';
import { GithubIcon } from 'icons/internal/GithubIcon';
import { IconButton } from 'components/Button/IconButton';
import { Flex } from 'components/Flex';
import { Rhythm, RhythmProps } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import pkg from '../../../package.json';

export type PageTitleProps = Omit<RhythmProps, 'children'> & {
  src?: string;
  title: string;
  url?: string;
};

/**
 * Storybook docs don't change themes well so this
 * uses a hardcoded grey that works with both light
 * and dark backgrounds.
 */
export function PageTitle({ title, src, url: initUrl, ...props }: PageTitleProps): JSX.Element {
  const repository = pkg.repository.url.replace(/\.git$/, '');
  const url = initUrl || (repository && src && `${repository}/tree/develop/src/${src}`) || undefined;

  return (
    <Rhythm mb={4} {...props}>
      <Flex wrap alignItems="center" justifyContent="space-between" style={{ color: '#707075' }}>
        <Typography<'h1'> as="h1" heading="h1" style={{ fontSize: 48, margin: 0 }} weight="lighter">
          {title}
        </Typography>

        <IconButton unthemed as="a" href={url} target="_blank">
          <GithubIcon size={24} />
        </IconButton>
      </Flex>
    </Rhythm>
  );
}

PageTitle.displayName = 'PageTitle';
