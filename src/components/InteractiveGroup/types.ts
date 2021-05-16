export type InteractiveGroupItemId = string | number;

export type InteractiveGroupItemType<T extends InteractiveGroupItemId> = {
  disabled?: boolean;
  id: T;
  label: React.ReactNode;
  triggerOnly?: () => void;
};
