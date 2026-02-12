
import { CarPurchase } from './types';

export const RECENT_PURCHASES: CarPurchase[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Hilux SR5',
    year: 2021,
    location: 'Melbourne, VIC',
    pricePaid: '$18,500',
    condition: 'Damaged',
    imageUrl: 'https://picsum.photos/id/1071/800/600',
    date: '2 hours ago',
    description: 'Front-end collision damage. Chassis intact. Purchased for parts salvaging.'
  },
  {
    id: '2',
    make: 'Ford',
    model: 'Ranger Wildtrak',
    year: 2019,
    location: 'Sydney, NSW',
    pricePaid: '$12,200',
    condition: 'Non-runner',
    imageUrl: 'https://picsum.photos/id/183/800/600',
    date: '5 hours ago',
    description: 'Engine seizure issues. Clean body and interior. Ideal for mechanical refurb.'
  },
  {
    id: '3',
    make: 'Mazda',
    model: 'CX-5',
    year: 2022,
    location: 'Brisbane, QLD',
    pricePaid: '$15,750',
    condition: 'Wrecked',
    imageUrl: 'https://picsum.photos/id/111/800/600',
    date: '1 day ago',
    description: 'Rear-end write-off. Electronic components and front panels harvested for resale.'
  },
  {
    id: '4',
    make: 'Volkswagen',
    model: 'Golf GTI',
    year: 2017,
    location: 'Perth, WA',
    pricePaid: '$8,900',
    condition: 'Used',
    imageUrl: 'https://picsum.photos/id/133/800/600',
    date: '2 days ago',
    description: 'High mileage, minor cosmetic wear. Purchased for fleet wrecking.'
  },
  {
    id: '5',
    make: 'Tesla',
    model: 'Model 3',
    year: 2021,
    location: 'Adelaide, SA',
    pricePaid: '$22,000',
    condition: 'Damaged',
    imageUrl: 'https://picsum.photos/id/211/800/600',
    date: '3 days ago',
    description: 'Battery health intact. Left side impact damage. Purchased for EV parts.'
  },
  {
    id: '6',
    make: 'Subaru',
    model: 'WRX',
    year: 2015,
    location: 'Hobart, TAS',
    pricePaid: '$6,400',
    condition: 'Non-runner',
    imageUrl: 'https://picsum.photos/id/231/800/600',
    date: '4 days ago',
    description: 'Blown turbo and head gasket. Body in fair condition.'
  }
];
