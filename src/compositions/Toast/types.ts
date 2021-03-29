import React from 'react';
import { CornerPosition, StateColor, VerticalPositionCentered } from '../../types/ui';

export type ToastItemType = React.ReactElement;

export type ToastNotificationLevel = StateColor | 'default' | 'info';

export type ToastContainerPosition = VerticalPositionCentered | CornerPosition;
