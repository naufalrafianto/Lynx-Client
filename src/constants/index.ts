import {
  ChartArea,
  ChartNoAxesColumnIncreasing,
  MessageCircle,
} from 'lucide-react';
import { Feature, NavbarMenuItem, PricingTier } from '@/types';

export const NAVBAR_MENU: NavbarMenuItem[] = [
  { id: '1', label: 'About', path: '#about' },
  { id: '2', label: 'Features', path: '#features' },
  { id: '3', label: 'Pricing', path: '#pricing' },
];

export const features: Feature[] = [
  {
    id: '1',
    icon: ChartArea,
    title: 'Advanced Analytics',
    description:
      'Get detailed insights into your link performance with comprehensive analytics.',
  },
  {
    id: '2',
    icon: ChartNoAxesColumnIncreasing,
    title: 'Link Management',
    description:
      'Organize and manage your links efficiently with our powerful tools.',
  },
  {
    id: '3',
    icon: MessageCircle,
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with team members on link management.',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for personal use and small projects',
    features: [
      'Up to 50 links per month',
      'Basic analytics',
      'Custom back-half links',
      'Link expiration dates',
      'Standard support',
    ],
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'Ideal for growing businesses and creators',
    features: [
      'Unlimited links',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration',
      'API access',
      'Priority support',
      'UTM builder',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with specific needs',
    features: [
      'Everything in Pro',
      'SSO integration',
      'SLA guarantee',
      'Dedicated support',
      'Custom integrations',
      'Advanced security',
      'Bulk link creation',
    ],
  },
];
