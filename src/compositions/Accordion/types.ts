import { InteractiveGroupItemType } from '../../components/InteractiveGroup/types';

export type AccordionItemType = InteractiveGroupItemType & {
  as?: React.ReactNode;
  content: React.ReactNode;
  contentProps?: Record<string, unknown>;
  iconOnly?: boolean;
  labelProps?: Record<string, unknown>;
};
