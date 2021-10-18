import { InteractiveGroupItemType } from '../../components/InteractiveGroup/types';

export type AccordionItemStateProps = {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
};

export type AccordionItemType = Omit<InteractiveGroupItemType<string>, 'label'> & {
  content: React.ReactNode | ((props: AccordionItemStateProps) => React.ReactNode);
  contentProps?: Record<string, unknown>;
  iconOnly?: boolean;
  label: React.ReactNode | ((props: AccordionItemStateProps) => React.ReactNode);
  labelProps?: Record<string, unknown>;
};
