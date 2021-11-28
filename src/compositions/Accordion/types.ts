import { InteractiveGroupItemType } from '../../components/InteractiveGroup/types';

export type AccordionItemStateProps = {
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
};

export type AccordionItemType = Omit<InteractiveGroupItemType<string>, 'label'> & {
  content:
    | React.ReactChild
    | React.ReactFragment
    | ((props: AccordionItemStateProps) => React.ReactChild | React.ReactFragment);
  contentProps?: Record<string, unknown>;
  iconOnly?: boolean;
  label:
    | React.ReactChild
    | React.ReactFragment
    | ((props: AccordionItemStateProps) => React.ReactChild | React.ReactFragment);
  labelProps?: Record<string, unknown>;
};
