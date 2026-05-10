export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'buckets' | 'burgers' | 'wings' | 'sides' | 'drinks';
  popular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'Original Recipe Bucket',
    price: 19.99,
    description: '10 pieces of our world-famous Original Recipe chicken.',
    image: 'https://picsum.photos/seed/kfc-bucket/800/600',
    category: 'buckets',
    popular: true,
  },
  {
    id: 'bu1',
    name: 'Zinger Burger',
    price: 5.99,
    description: 'Spicy zinger fillet with fresh lettuce and mayo.',
    image: 'https://picsum.photos/seed/kfc-zinger/800/600',
    category: 'burgers',
    popular: true,
  },
  {
    id: 'w1',
    name: 'Hot Wings (6pc)',
    price: 6.49,
    description: 'Crispy, spicy hot wings.',
    image: 'https://picsum.photos/seed/kfc-wings/800/600',
    category: 'wings',
    popular: true,
  },
  {
    id: 's1',
    name: 'Large Fries',
    price: 3.49,
    description: 'Golden fries seasoned with our special salt.',
    image: 'https://picsum.photos/seed/kfc-fries/800/600',
    category: 'sides',
  },
  {
    id: 's2',
    name: 'Gravy',
    price: 1.50,
    description: 'Our signature rich gravy.',
    image: 'https://picsum.photos/seed/kfc-gravy/800/600',
    category: 'sides',
  }
];
