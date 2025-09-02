import axios from 'axios';
import Item from '../models/Item';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
class ItemService {
  async getAllItems(): Promise<Item[]> {
    try {
      const response = await axios.get(API_URL);
      const items: Item[] = response.data.map((post: any) => ({
        id: post.id.toString(),
        title: post.title,
      }));

      return items;
    } catch (error) {
      return [];
    }
  }

  addItem(name: string): void {
    const newItem: Item = {
      id: Date.now().toString(),
      title: name,
    };
  }
}

export default new ItemService();