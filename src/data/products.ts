export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description?: string;
  features?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  // Audio Products
  {
    id: '1',
    name: 'Quantum Headphones Pro',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    category: 'Audio',
    rating: 4.8,
    reviews: 124,
    description: 'Premium wireless headphones with quantum audio technology',
    isFeatured: true,
    isNew: true
  },
  {
    id: '2',
    name: 'Wireless Earbuds Elite',
    price: 199,
    originalPrice: 249,
    image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg',
    category: 'Audio',
    rating: 4.9,
    reviews: 203,
    description: 'True wireless earbuds with active noise cancellation',
    isFeatured: true
  },
  {
    id: '3',
    name: 'Studio Monitor Speakers',
    price: 599,
    image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg',
    category: 'Audio',
    rating: 4.7,
    reviews: 89,
    description: 'Professional studio monitors for audiophiles'
  },
  {
    id: '4',
    name: 'Bluetooth Speaker Max',
    price: 149,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
    category: 'Audio',
    rating: 4.6,
    reviews: 156,
    description: 'Portable speaker with 360-degree sound'
  },
  {
    id: '5',
    name: 'Gaming Headset Pro',
    price: 179,
    image: 'https://images.pexels.com/photos/3753525/pexels-photo-3753525.jpeg',
    category: 'Audio',
    rating: 4.8,
    reviews: 234,
    description: 'Professional gaming headset with surround sound'
  },

  // Gaming Products
  {
    id: '6',
    name: 'Gaming Controller Pro',
    price: 129,
    originalPrice: 159,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    category: 'Gaming',
    rating: 4.9,
    reviews: 89,
    description: 'Wireless gaming controller with haptic feedback',
    isFeatured: true
  },
  {
    id: '7',
    name: 'VR Headset Elite',
    price: 699,
    originalPrice: 899,
    image: 'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg',
    category: 'Gaming',
    rating: 4.9,
    reviews: 145,
    description: 'Next-gen VR headset with 4K displays',
    isNew: true
  },
  {
    id: '8',
    name: 'Gaming Keyboard RGB',
    price: 199,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg',
    category: 'Gaming',
    rating: 4.7,
    reviews: 312,
    description: 'Mechanical gaming keyboard with RGB lighting'
  },
  {
    id: '9',
    name: 'Gaming Mouse Ultra',
    price: 89,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg',
    category: 'Gaming',
    rating: 4.8,
    reviews: 278,
    description: 'High-precision gaming mouse with customizable buttons'
  },
  {
    id: '10',
    name: 'Gaming Chair Deluxe',
    price: 399,
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg',
    category: 'Gaming',
    rating: 4.6,
    reviews: 167,
    description: 'Ergonomic gaming chair with lumbar support'
  },

  // Mobile Products
  {
    id: '11',
    name: 'Smart Phone Ultra',
    price: 999,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    category: 'Mobile',
    rating: 4.7,
    reviews: 256,
    description: 'Flagship smartphone with AI camera system',
    isFeatured: true
  },
  {
    id: '12',
    name: 'Tablet Pro Max',
    price: 799,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
    category: 'Mobile',
    rating: 4.8,
    reviews: 189,
    description: 'Professional tablet with stylus support'
  },
  {
    id: '13',
    name: 'Phone Case Premium',
    price: 49,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    category: 'Mobile',
    rating: 4.5,
    reviews: 423,
    description: 'Premium leather phone case with card slots'
  },
  {
    id: '14',
    name: 'Wireless Charger Fast',
    price: 79,
    image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg',
    category: 'Mobile',
    rating: 4.6,
    reviews: 298,
    description: 'Fast wireless charging pad with cooling fan'
  },
  {
    id: '15',
    name: 'Power Bank Ultra',
    price: 99,
    image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg',
    category: 'Mobile',
    rating: 4.7,
    reviews: 345,
    description: '20000mAh power bank with fast charging'
  },

  // Wearable Products
  {
    id: '16',
    name: 'Cyber Smartwatch',
    price: 399,
    originalPrice: 499,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'Wearable',
    rating: 4.6,
    reviews: 178,
    description: 'Advanced smartwatch with health monitoring',
    isNew: true
  },
  {
    id: '17',
    name: 'Fitness Tracker Pro',
    price: 199,
    image: 'https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg',
    category: 'Wearable',
    rating: 4.5,
    reviews: 267,
    description: 'Comprehensive fitness tracker with GPS'
  },
  {
    id: '18',
    name: 'Smart Ring Health',
    price: 299,
    image: 'https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg',
    category: 'Wearable',
    rating: 4.4,
    reviews: 134,
    description: 'Smart ring for health and sleep tracking'
  },
  {
    id: '19',
    name: 'AR Glasses Beta',
    price: 1299,
    image: 'https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg',
    category: 'Wearable',
    rating: 4.3,
    reviews: 67,
    description: 'Augmented reality glasses for developers',
    isNew: true
  },

  // Computer Products
  {
    id: '20',
    name: 'Laptop Gaming Beast',
    price: 1899,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
    category: 'Computer',
    rating: 4.8,
    reviews: 156,
    description: 'High-performance gaming laptop with RTX graphics'
  },
  {
    id: '21',
    name: 'Desktop Workstation',
    price: 2499,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'Computer',
    rating: 4.9,
    reviews: 89,
    description: 'Professional workstation for content creators'
  },
  {
    id: '22',
    name: 'Monitor 4K Ultra',
    price: 599,
    image: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
    category: 'Computer',
    rating: 4.7,
    reviews: 234,
    description: '32-inch 4K monitor with HDR support'
  },
  {
    id: '23',
    name: 'Webcam Pro 4K',
    price: 199,
    image: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg',
    category: 'Computer',
    rating: 4.6,
    reviews: 178,
    description: '4K webcam with auto-focus and noise reduction'
  },
  {
    id: '24',
    name: 'External SSD Fast',
    price: 299,
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    category: 'Computer',
    rating: 4.8,
    reviews: 312,
    description: '2TB external SSD with USB-C connectivity'
  },

  // Smart Home Products
  {
    id: '25',
    name: 'Smart Speaker Hub',
    price: 149,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
    category: 'Smart Home',
    rating: 4.5,
    reviews: 289,
    description: 'Smart speaker with voice assistant and hub features'
  },
  {
    id: '26',
    name: 'Security Camera 4K',
    price: 199,
    image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg',
    category: 'Smart Home',
    rating: 4.6,
    reviews: 234,
    description: '4K security camera with night vision'
  },
  {
    id: '27',
    name: 'Smart Thermostat',
    price: 249,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg',
    category: 'Smart Home',
    rating: 4.7,
    reviews: 167,
    description: 'AI-powered smart thermostat with learning capabilities'
  },
  {
    id: '28',
    name: 'Smart Light Bulbs',
    price: 79,
    image: 'https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg',
    category: 'Smart Home',
    rating: 4.4,
    reviews: 456,
    description: 'RGB smart bulbs with app control (4-pack)'
  },
  {
    id: '29',
    name: 'Robot Vacuum Pro',
    price: 599,
    image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg',
    category: 'Smart Home',
    rating: 4.8,
    reviews: 198,
    description: 'AI-powered robot vacuum with mapping technology'
  },
  {
    id: '30',
    name: 'Smart Doorbell',
    price: 199,
    image: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg',
    category: 'Smart Home',
    rating: 4.5,
    reviews: 278,
    description: 'Video doorbell with two-way audio and motion detection'
  }
];

export const getFeaturedProducts = () => products.filter(p => p.isFeatured);
export const getNewProducts = () => products.filter(p => p.isNew);
export const getProductsByCategory = (category: string) => 
  category === 'All' ? products : products.filter(p => p.category === category);