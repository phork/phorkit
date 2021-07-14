import React from 'react';
import { SvgIconProps, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import { Flex, FlexProps } from '../../components/Flex';
import { Rhythm } from '../../components/Rhythm';
import { Typography, TypographyProps, TypographyWithSvg } from '../../components/Typography';

export interface IconCountProps extends Omit<FlexProps, 'children'>, ThemeProps {
  active?: boolean;
  count: string | number;
  icon: React.FC<SvgIconProps>;
  iconSize?: number;
  label: string;
  typographySize?: TypographyProps['size'];
}

export function IconCount({
  active = false,
  count,
  icon: Icon,
  iconSize = 15,
  label,
  reverse = false,
  themeId: initThemeId,
  typographySize = 'xs',
  ...props
}: IconCountProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <Flex alignItems="center" direction="row" justifyContent="flex-start" reverse={reverse} {...props}>
      <TypographyWithSvg
        color={active ? 'accent-primary' : 'secondary'}
        themeId={themeId}
        volume={active ? undefined : 'quietest'}
      >
        <Icon size={iconSize} title={label} />
      </TypographyWithSvg>
      <Rhythm ml={reverse ? 0 : 2} mr={reverse ? 2 : 0}>
        <Typography
          color={active ? 'accent-primary' : 'secondary'}
          size={typographySize}
          themeId={themeId}
          volume={active ? undefined : 'quiet'}
          weight="bold"
        >
          {count === undefined ? '-' : count}
        </Typography>
      </Rhythm>
    </Flex>
  );
}

IconCount.displayName = 'IconCount';
