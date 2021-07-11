import React, { useCallback, useState } from 'react';
import { MergeProps, SvgIconProps } from '../../../types';
import { useTranslations } from '../../../hooks/useTranslations';
import { EyeIcon } from '../../../icons/EyeIcon';
import { EyeSlashIcon } from '../../../icons/EyeSlashIcon';
import { Textbox, TextboxProps, TextboxTranslations, textboxTranslations } from './Textbox';
import styles from './styles/Textbox.module.css';

const iconSizes = {
  medium: 16,
  large: 16,
  xlarge: 17,
  xxlarge: 19,
  xxxlarge: 21,
  xxxxlarge: 23,
  xxxxxlarge: 24,
  xxxxxxlarge: 24,
  xxxxxxxlarge: 24,
};

export type PasswordTranslations = TextboxTranslations & {
  hidePasswordLabel: string;
  showPasswordLabel: string;
};

const passwordTranslations: PasswordTranslations = {
  ...textboxTranslations,
  hidePasswordLabel: 'Hide password',
  showPasswordLabel: 'Show password',
};

export interface LocalPasswordProps {
  iconHide?: React.FC<SvgIconProps>;
  iconHideSize?: number;
  iconShow?: React.FC<SvgIconProps>;
  iconShowSize?: number;
  initialType?: 'password' | 'text';
  translations?: PasswordTranslations;
}

export type PasswordProps = MergeProps<TextboxProps, LocalPasswordProps>;
export type PasswordRef = React.ForwardedRef<HTMLInputElement>;

function PasswordBase(
  {
    disabled,
    iconHide,
    iconHideSize: initIconHideSize,
    iconShow,
    iconShowSize: initIconShowSize,
    initialType = 'password',
    size = 'large',
    translations: customTranslations,
    ...props
  }: PasswordProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
) {
  const [type, setType] = useState<'text' | 'password'>(initialType);

  const translations = useTranslations({ customTranslations, fallbackTranslations: passwordTranslations });
  const { showPasswordLabel, hidePasswordLabel } = translations;

  const hidePassword = useCallback(() => setType('password'), []);
  const showPassword = useCallback(() => setType('text'), []);

  // eslint-disable-next-line react/prop-types
  const renderButton = ({
    icon: Icon,
    iconSize,
    label,
    onClick,
  }: {
    icon: React.FC<SvgIconProps>;
    iconSize?: number;
    label: string;
    onClick: React.MouseEventHandler;
  }) => (
    <button aria-label={label} className={styles.textboxButton} type="button" onClick={onClick}>
      <Icon size={iconSize} title={label} />
    </button>
  );

  const renderIcon = () => {
    const iconHideSize = initIconHideSize || iconSizes[size];
    const iconShowSize = initIconShowSize || iconSizes[size];

    const icon = type === 'password' ? iconShow : iconHide;
    const iconSize = type === 'password' ? iconShowSize : iconHideSize;
    const handleClick = type === 'password' ? showPassword : hidePassword;
    const label = type === 'password' ? showPasswordLabel : hidePasswordLabel;

    if (typeof icon === 'object' && React.isValidElement(icon)) {
      return React.cloneElement(icon, {
        onClick: handleClick,
      });
    }

    if (typeof icon === 'function') {
      return renderButton({
        icon,
        label,
        onClick: handleClick,
        iconSize,
      });
    }

    return renderButton({
      icon: type === 'password' ? EyeIcon : EyeSlashIcon,
      label,
      onClick: handleClick,
      iconSize,
    });
  };

  return (
    <Textbox
      ref={forwardedRef}
      disabled={disabled}
      iconAfter={!disabled ? renderIcon() : undefined}
      iconAfterActionable
      size={size}
      type={type}
      {...props}
    />
  );
}

export const Password = React.forwardRef(PasswordBase);

PasswordBase.displayName = 'PasswordBase';
Password.displayName = 'Password';
