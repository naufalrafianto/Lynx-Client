export interface NavbarMenuItem {
  id: string;
  label: string;
  path: string;
}

export interface Feature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}
