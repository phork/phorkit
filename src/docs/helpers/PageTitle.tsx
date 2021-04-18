import { useConfig } from 'docz';
import * as React from 'react';
import { GithubIcon } from 'icons/internal/GithubIcon';
import { IconButton } from 'components/Button/IconButton';
import { Flex } from 'components/Flex';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';

export interface PageTitleProps {
  src?: string;
  title: string;
  url?: string;
}

export function PageTitle({ title, src, url: initUrl }: PageTitleProps): React.ReactElement {
  const { repository } = useConfig();
  const url = initUrl || (repository && src && `${repository}/tree/develop/src/${src}`) || undefined;

  return (
    <Rhythm mb={4}>
      <Flex alignItems="center" justifyContent="space-between" wrap>
        <Typography heading="h1" weight="lighter" style={{ fontSize: 48 }}>
          {title}
        </Typography>

        <IconButton as="a" color="neutral" themeId="light" href={url} target="_blank">
          <GithubIcon size={24} />
        </IconButton>
      </Flex>
    </Rhythm>
  );
}

PageTitle.displayName = 'PageTitle';
