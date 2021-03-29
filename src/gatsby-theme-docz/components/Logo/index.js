import React from 'react';
import { Flex } from 'components/Flex';
import { Rhythm } from 'components/Rhythm';
import { Typography } from 'components/Typography';
import { PhorkIcon } from 'icons/internal/PhorkIcon';

export const Logo = () => {
  return (
    <Flex alignItems="center">
      <PhorkIcon size={30} />
      <Rhythm ml={4}>
        <Typography heading="h1">Phork/it</Typography>
      </Rhythm>
    </Flex>
  );
};
