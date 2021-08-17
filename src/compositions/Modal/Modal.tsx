import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useFocusReturn } from '../../hooks/useFocusReturn';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { useTranslations } from '../../hooks/useTranslations';
import { getFirstFocusableElement } from '../../utils/getFocusableElements';
import { TimesIcon } from '../../icons/TimesIcon';
import { IconButton } from '../../components/Button/IconButton';
import styles from './styles/Modal.module.css';
import { useModalComponentIds } from './useModalComponentIds';

export type ModalTranslations = {
  closeLabel: string;
};

export const modalTranslations: ModalTranslations = {
  closeLabel: 'Close modal',
};

type RenderProps = { focusRef?: React.MutableRefObject<HTMLElement | null>; id?: string };

export interface ModalProps extends ThemeProps {
  allowOverflow?: boolean;
  /** If a header isn't included with a title this should be used to label the modal */
  ariaLabel?: string;
  children: ((props: RenderProps) => React.ReactElement) | React.ReactElement | React.ReactElement[];
  className?: string;
  focusable?: boolean;
  id?: string;
  immediate?: boolean;
  onClose?: (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, id?: string) => void;
  permanent?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  translations?: ModalTranslations;
}

export function Modal({
  allowOverflow = false,
  ariaLabel,
  children,
  className,
  focusable = false,
  id,
  immediate = false,
  onClose,
  permanent = false,
  size,
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: ModalProps): React.ReactElement<ModalProps, 'div'> {
  const ref = useRef<HTMLDivElement>(null!);
  const focusRef = useRef<HTMLElement>(null!);
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout } = useSafeTimeout();
  const [hasTransitioned, setHasTransitioned] = useState<boolean>(immediate || false);
  const { changeFocus, returnFocus } = useFocusReturn();
  const { componentId, generateTitleId } = useModalComponentIds(id);
  const translations = useTranslations({ customTranslations, fallbackTranslations: modalTranslations });
  const { closeLabel } = translations;

  const handleClose = useCallback(
    event => {
      onClose && onClose(event, id);
    },
    [id, onClose],
  );

  useLayoutEffect(() => {
    !hasTransitioned && setSafeTimeout(() => setHasTransitioned(true), 100);
  }, [hasTransitioned, setSafeTimeout]);

  // focus either a predefined element or the first one and then reset the scrolling back to the top
  useEffect((): (() => void) | void => {
    if (focusable) {
      changeFocus(focusRef.current || (ref.current && getFirstFocusableElement(ref.current)));
      if (ref.current) {
        ref.current.scrollTop = 0;
        ref.current.scrollLeft = 0;
      }
      return () => returnFocus();
    }
  }, [changeFocus, focusable, returnFocus]);

  type AriaProps = {
    'aria-label'?: string;
    'aria-labelledby'?: string;
  };

  const ariaProps: AriaProps = {};
  ariaLabel ? (ariaProps['aria-label'] = ariaLabel) : (ariaProps['aria-labelledby'] = generateTitleId());

  return (
    <div
      aria-modal
      className={cx(
        styles.modal,
        size && styles[`modal--${size}`],
        themeId && styles[`modal--${themeId}`],
        allowOverflow && styles['modal--allowOverflow'],
        !immediate && styles['modal--transitional'],
        hasTransitioned && styles['has-transitioned'],
        className,
      )}
      ref={ref}
      role="dialog"
      {...ariaProps}
      {...props}
    >
      <div className={styles.modalActions}>
        {!permanent && onClose && (
          <IconButton<'button'>
            aria-label={closeLabel}
            as="button"
            color="neutral"
            onClick={handleClose}
            shape="square"
            size="small"
            themeId={themeId}
            weight="ghost"
          >
            <TimesIcon size={12} title={closeLabel} />
          </IconButton>
        )}
      </div>

      {typeof children === 'function'
        ? children({ id: componentId, focusRef: focusable ? focusRef : undefined })
        : children}
    </div>
  );
}

Modal.displayName = 'Modal';
