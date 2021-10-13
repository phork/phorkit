import { InteractiveGroupItemId, InteractiveGroupItemType } from './types';

export class InteractiveGroupItems<T extends InteractiveGroupItemId = string> {
  items: readonly InteractiveGroupItemType<T>[];

  constructor(items: readonly InteractiveGroupItemType<T>[] = []) {
    this.items = items;
  }

  public getAll(): readonly InteractiveGroupItemType<T>[] {
    return this.items;
  }

  public getItemId(item: InteractiveGroupItemType<T>): T {
    return item.id;
  }

  public isItemDisabled(item: InteractiveGroupItemType<T>): boolean {
    return !!item.disabled;
  }

  public isItemTriggerOnly(item: InteractiveGroupItemType<T>): boolean {
    return !item || !!item.triggerOnly;
  }

  public getIndexById(id?: T): number | undefined {
    const index = this.items.findIndex(item => this.getItemId(item) === id);
    return index === -1 ? undefined : index;
  }

  public getIndexByIds(ids: readonly T[]): number[] | undefined {
    const indexes = ids?.map(id => this.getIndexById(id)).filter(index => index !== undefined) as number[];
    return indexes?.length > 0 ? indexes : undefined;
  }

  public getItemById(id?: T): InteractiveGroupItemType<T> | undefined {
    const index = id ? this.getIndexById(id) : undefined;
    return index !== undefined ? this.items[index as number] : undefined;
  }

  public getItemByIds(ids: readonly T[]): InteractiveGroupItemType<T>[] | undefined {
    const items = ids
      ?.map(id => this.getItemById(id))
      .filter(item => item !== undefined) as InteractiveGroupItemType<T>[];
    return items?.length > 0 ? items : undefined;
  }

  getNextEnabledIndexInSequence(startIndex: number, reverse?: boolean): number | undefined {
    const firstIndex = 0;
    const lastIndex = this.items.length - 1;
    let index = startIndex;

    if (this.items.length) {
      for (let i = 0; i < this.items.length; i += 1) {
        if (index < firstIndex) {
          index = lastIndex;
        } else if (index > lastIndex) {
          index = firstIndex;
        }

        if (!this.isItemDisabled(this.items[index])) {
          return index;
        }

        index += reverse ? -1 : 1;
      }
    }

    return undefined;
  }

  at(index: number): InteractiveGroupItemType<T> {
    return this.items[index];
  }

  nextIndex(startIndex: number): number | undefined {
    return this.getNextEnabledIndexInSequence(startIndex + 1);
  }

  previousIndex(startIndex: number): number | undefined {
    return this.getNextEnabledIndexInSequence(startIndex - 1, true);
  }

  firstIndex(): number | undefined {
    return this.getNextEnabledIndexInSequence(0, true);
  }

  lastIndex(): number | undefined {
    return this.getNextEnabledIndexInSequence(this.items.length - 1);
  }
}

export const interactiveGroupItemsFactory = <T extends InteractiveGroupItemId = string>(
  items: readonly InteractiveGroupItemType<T>[],
) => new InteractiveGroupItems<T>(items);
