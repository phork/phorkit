import { cx } from '@emotion/css';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useFocusReturn } from '../../hooks/useFocusReturn';
import { useFocusTrap } from '../../hooks/useFocusTrap';
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

type RenderProps<E extends HTMLElement = HTMLElement> = { focusRef?: React.MutableRefObject<E | null>; id?: string };

export type ModalProps<E extends HTMLElement = HTMLElement> = Omit<ThemeProps, 'contrast' | 'unthemed'> & {
  allowOverflow?: boolean;
  /** If a header isn't included with a title this should be used to label the modal */
  ariaLabel?: string;
  children: ((props: RenderProps<E>) => React.ReactElement) | React.ReactElement | React.ReactElement[];
  className?: string;
  /** The context ID is used by both the modal system and the aria-label system */
  contextId?: string;
  /** When a modal is focusable the active element changes to the modal */
  focusable?: boolean;
  /** The immediate flag removes the entry animation */
  immediate?: boolean;
  onClose?: (event?: React.MouseEvent | React.KeyboardEvent | React.TouchEvent, contextId?: string) => void;
  /** A permanent modal doesn't have a close button */
  permanent?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  style?: React.CSSProperties;
  translations?: Partial<ModalTranslations>;
};

/**
 * A modal is a container that wraps `ModalHeader`, `ModalBody`
 * and `ModalFooter` components. If it's not permanent and
 * has an `onClose` prop then a close button is added.
 *
 * The modal should be a child of a `ModalContainer` which
 * creates a portal and handles the escape functionality.
 *
 * If the modal is focusable it provides a `focusRef` prop
 * to the children which can be attached to the element
 * that should get the focus when the modal opens.
 *
 * Modals have a small animation on the initial render
 * unless the `immediate` flag is set.
 *
 * This uses the `IconButton` component.
 */
export function Modal<E extends HTMLElement = HTMLElement>({
  allowOverflow = false,
  ariaLabel,
  children,
  className,
  contextId,
  focusable = false,
  immediate = false,
  onClose,
  permanent = false,
  size,
  themeId: initThemeId,
  translations: customTranslations,
  ...props
}: ModalProps<E>): React.ReactElement<ModalProps> {
  const ref = useRef<HTMLDivElement>(null);
  const focusRef = useRef<E>(null!);
  const themeId = useThemeId(initThemeId);
  const { setSafeTimeout } = useSafeTimeout();
  const [hasTransitioned, setHasTransitioned] = useState<boolean>(immediate || false);
  const { changeFocus, returnFocus } = useFocusReturn();
  const { componentId, generateTitleId } = useModalComponentIds(contextId);
  const translations = useTranslations<ModalTranslations>({
    customTranslations,
    fallbackTranslations: modalTranslations,
  });
  const { closeLabel } = translations;

  // keep the focus within the modal when navigating by tab and shift+tab
  useFocusTrap<HTMLDivElement>({ container: ref });

  const handleClose = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent | React.TouchEvent): void => {
      onClose && onClose(event, contextId);
    },
    [contextId, onClose],
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
