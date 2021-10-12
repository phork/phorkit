export type InteractiveGroupItemId = string | number;

export type InteractiveGroupItemType<T extends InteractiveGroupItemId = string> = {
  disabled?: boolean;
  id: T;
  label: React.ReactNode;
  triggerOnly?: () => void;
};

export type InteractiveGroupSelectEventHandlerProps<T extends InteractiveGroupItemId = string> = {
  id?: T;
  index?: number;
};
