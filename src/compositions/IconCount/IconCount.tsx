import React from 'react';
import { SvgIconProps, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { Flex, FlexProps } from '../../components/Flex';
import { Rhythm } from '../../components/Rhythm';
import { Typography, TypographyProps, TypographyWithSvg } from '../../components/Typography';

export type IconCountProps = Pick<FlexProps, 'className' | 'inline' | 'reverse' | 'style'> &
  Omit<ThemeProps, 'contrast' | 'unthemed'> & {
    active?: boolean;
    count: string | number;
    icon: React.FC<SvgIconProps>;
    iconSize?: number;
    label: string;
    typographySize?: TypographyProps['size'];
  };

/**
 * The icon count renders an SVG icon and some text
 * next to each other. The icon can be first or
 * last (reversed) and has an optional active state.
 * Both the icon size and the text size can be
 * customized.
 *
 * This uses the `Flex`, `Rhythm` and `Typography`
 * components.
 */
export function IconCount({
  active = false,
  count,
  icon: Icon,
  iconSize = 15,
  label,
  reverse = false,
  themeId: initThemeId,
  typographySize = 'xsmall',
  ...props
}: IconCountProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <Flex alignItems="center" direction="row" justifyContent="flex-start" reverse={reverse} {...props}>
      <TypographyWithSvg<'div'>
        as="div"
        color={active ? 'accent' : 'secondary'}
        themeId={themeId}
        volume={active ? undefined : 'quietest'}
      >
        <Icon size={iconSize} title={label} />
      </TypographyWithSvg>
      <Rhythm ml={reverse ? 0 : 2} mr={reverse ? 2 : 0}>
        <Typography<'div'>
          as="div"
          color={active ? 'accent' : 'secondary'}
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
