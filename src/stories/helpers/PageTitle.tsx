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

export function PageTitle({ title, src, url: initUrl, ...props }: PageTitleProps): React.ReactElement {
  const repository = pkg.repository.url.replace(/\.git$/, '');
  const url = initUrl || (repository && src && `${repository}/tree/develop/src/${src}`) || undefined;

  return (
    <Rhythm mb={4} {...props}>
      <Flex wrap alignItems="center" justifyContent="space-between">
        <Typography<'h1'> as="h1" color="primary" heading="h1" style={{ fontSize: 48, margin: 0 }} weight="lighter">
          {title}
        </Typography>

        <IconButton as="a" color="neutral" href={url} target="_blank" themeId="light">
          <GithubIcon size={24} />
        </IconButton>
      </Flex>
    </Rhythm>
  );
}

PageTitle.displayName = 'PageTitle';
