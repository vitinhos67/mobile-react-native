import Item from '../models/Item';

class ItemService {
  private items: Item[] = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
  ];

  getAllItems(): Item[] {
    return this.items;
  }

  addItem(name: string): void {
    const newItem: Item = {
      id: Date.now().toString(),
      title: name,
    };
    this.items.push(newItem);
  }
}

export default new ItemService();