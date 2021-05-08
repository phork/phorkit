import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ThemeProps } from '../../types';
import { useFocusReturn } from '../../hooks/useFocusReturn';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import { getFirstFocusableElement } from '../../utils/getFocusableElements';
import { RenderFromPropElement, renderFromProp } from '../../utils/renderFromProp';
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

export interface ModalProps extends ThemeProps {
  allowOverflow?: boolean;
  /* if a header isn't included with a title this should be used to label the modal */
  ariaLabel?: string;
  children: RenderFromPropElement | RenderFromPropElement[];
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
  allowOverflow,
  ariaLabel,
  children,
  className,
  focusable,
  id,
  immediate,
  onClose,
  permanent,
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

  type RenderProps = { focusRef?: React.MutableRefObject<HTMLElement | null> };

  const renderProps: RenderProps = {};
  focusable && typeof children === 'function' && (renderProps.focusRef = focusRef);
  const content = renderFromProp(children, { id: componentId, ...renderProps });

  useLayoutEffect(() => {
    !hasTransitioned && setSafeTimeout(() => setHasTransitioned(true), 100);
  }, [hasTransitioned, setSafeTimeout]);

  // focus either a predefined element or the first one and then reset the scrolling back to the top
  useEffect((): (() => void) => {
    changeFocus(focusRef.current || (ref.current && getFirstFocusableElement(ref.current)));
    if (ref.current) {
      ref.current.scrollTop = 0;
      ref.current.scrollLeft = 0;
    }
    return () => returnFocus();
  }, [changeFocus, returnFocus]);

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
          <IconButton
            aria-label={closeLabel}
            themeId={themeId}
            color="neutral"
            onClick={handleClose}
            shape="square"
            weight="ghost"
          >
            <TimesIcon size={12} title={closeLabel} />
          </IconButton>
        )}
      </div>

      {content}
    </div>
  );
}

Modal.displayName = 'Modal';
