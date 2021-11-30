import React, { useRef } from 'react';
import { useThemeId } from 'context/Theme/useThemeId';
import { GithubIcon } from 'icons/internal/GithubIcon';
import { IconButton } from 'components/Button';
import { Flex, FlexProps } from 'components/Flex';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import pkg from '../../../package.json';

export function Introduction(props: FlexProps): JSX.Element {
  const themeId = useThemeId();
  const cachedThemeId = useRef(themeId);
  const repository = pkg.repository.url.replace(/\.git$/, '');

  return (
    <Flex wrap alignItems="flex-end" justifyContent="space-between" {...props}>
      <img
        alt="Phork/it by phork.works"
        height="100"
        src={`images/phorkit-credits-${cachedThemeId.current}.svg`}
        style={{ marginBottom: '12px', maxWidth: 'calc(100% - 20px' }}
        width="500"
      />
      <Flex alignItems="center" direction="row" style={{ marginBottom: 20 }}>
        {repository && (
          <IconButton<'a'>
            as="a"
            color="neutral"
            href={repository}
            shape="circle"
            size="large"
            target="_blank"
            themeId={cachedThemeId.current}
            weight="ghost"
          >
            <GithubIcon size={24} />
          </IconButton>
        )}
        <Rhythm ml={2}>
          <Typography
            as="h5"
            color="primary"
            heading="h5"
            style={{ margin: 0 }}
            themeId={cachedThemeId.current}
            variants="line-height-smash"
            volume="quietest"
          >{`Version ${pkg.version}`}</Typography>
        </Rhythm>
      </Flex>
    </Flex>
  );
}

Introduction.displayName = 'Introduction';
