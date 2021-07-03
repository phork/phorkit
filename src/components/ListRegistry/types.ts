export type ListRegistryItemType<E extends HTMLElement = HTMLElement> = React.MutableRefObject<E>;
export type ListRegistryState<E extends HTMLElement = HTMLElement> = Map<string, ListRegistryItemType<E>>;
