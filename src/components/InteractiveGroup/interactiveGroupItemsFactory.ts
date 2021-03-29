import { InteractiveGroupItemType } from './types';

export class InteractiveGroupItems {
  items: InteractiveGroupItemType[];

  constructor(items: InteractiveGroupItemType[] = []) {
    this.items = items;
  }

  public getItemId(item: InteractiveGroupItemType): string {
    return item.id;
  }

  public isItemDisabled(item: InteractiveGroupItemType): boolean {
    return !!item.disabled;
  }

  public isItemTriggerOnly(item: InteractiveGroupItemType): boolean {
    return !item || !!item.triggerOnly;
  }

  public getIndexById(id?: string): number | undefined {
    const index = this.items.findIndex(item => this.getItemId(item) === id);
    return index === -1 ? undefined : index;
  }

  public getIndexByIds(ids: Array<string | undefined>): number[] | undefined {
    const indexes = ids?.map(id => this.getIndexById(id)).filter(index => index !== undefined) as number[];
    return indexes?.length > 0 ? indexes : undefined;
  }

  public getItemById(id?: string): InteractiveGroupItemType | undefined {
    const index = id ? this.getIndexById(id) : undefined;
    return index !== undefined ? this.items[index as number] : undefined;
  }

  public getItemByIds(ids: Array<string | undefined>): InteractiveGroupItemType[] | undefined {
    const items = ids?.map(id => this.getItemById(id)).filter(item => item !== undefined) as InteractiveGroupItemType[];
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

  at(index: number): InteractiveGroupItemType {
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

export const interactiveGroupItemsFactory = (items: InteractiveGroupItemType[]) => new InteractiveGroupItems(items);
