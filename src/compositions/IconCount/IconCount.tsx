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
  active,
  count,
  icon: Icon,
  iconSize = 12,
  label,
  themeId: initThemeId,
  typographySize = 'xs',
  ...props
}: IconCountProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);

  return (
    <Flex direction="row" alignItems="center" justifyContent="flex-start" {...props}>
      <TypographyWithSvg
        color={active ? 'accent-primary' : 'secondary'}
        themeId={themeId}
        volume={active ? undefined : 'quietest'}
      >
        <Icon title={label} size={iconSize} />
      </TypographyWithSvg>
      <Rhythm ml={2}>
        <Typography
          color={active ? 'accent-primary' : 'secondary'}
          volume={active ? undefined : 'quiet'}
          size={typographySize}
          themeId={themeId}
          weight="bold"
        >
          {count === undefined ? '-' : count}
        </Typography>
      </Rhythm>
    </Flex>
  );
}
