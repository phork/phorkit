import React, { useCallback, useState } from 'react';
import { MergeProps, SvgIconProps } from '../../../types';
import { useTranslations } from '../../../hooks/useTranslations';
import { EyeIcon } from '../../../icons/EyeIcon';
import { EyeSlashIcon } from '../../../icons/EyeSlashIcon';
import { Textbox, TextboxProps, TextboxTranslations, textboxTranslations } from './Textbox';
import styles from './styles/Textbox.module.css';

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
  iconShow?: React.FC<SvgIconProps>;
  initialType?: 'password' | 'text';
  translations?: PasswordTranslations;
}

export type PasswordProps = MergeProps<TextboxProps, LocalPasswordProps>;

function PasswordBase(
  { disabled, iconHide, iconShow, initialType = 'password', translations: customTranslations, ...props }: PasswordProps,
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
    label,
    onClick,
  }: {
    icon: React.FC<SvgIconProps>;
    label: string;
    onClick: React.MouseEventHandler;
  }) => (
    <button aria-label={label} className={styles.textboxButton} type="button" onClick={onClick}>
      <Icon size={16} title={label} />
    </button>
  );

  const renderIcon = () => {
    const icon = type === 'password' ? iconShow : iconHide;
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
      });
    }

    return renderButton({
      icon: type === 'password' ? EyeIcon : EyeSlashIcon,
      label,
      onClick: handleClick,
    });
  };

  return (
    <Textbox
      ref={forwardedRef}
      disabled={disabled}
      iconAfter={!disabled ? renderIcon() : undefined}
      iconAfterActionable
      type={type}
      {...props}
    />
  );
}

export const Password = React.forwardRef(PasswordBase);
