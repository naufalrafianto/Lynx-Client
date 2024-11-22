import React from 'react';
import { Check, Minus } from 'lucide-react';

interface FeatureComparison {
  category: string;
  features: {
    name: string;
    basic: boolean;
    pro: boolean;
    enterprise: boolean;
    description?: string;
  }[];
}

const featureComparisons: FeatureComparison[] = [
  {
    category: 'Link Management',
    features: [
      {
        name: 'Custom back-half',
        basic: true,
        pro: true,
        enterprise: true,
        description: 'Customize the end of your shortened URLs',
      },
      {
        name: 'Custom domains',
        basic: false,
        pro: true,
        enterprise: true,
        description: 'Use your own domain for shortened links',
      },
      {
        name: 'Bulk link creation',
        basic: false,
        pro: false,
        enterprise: true,
        description: 'Create multiple links at once via CSV upload',
      },
    ],
  },
  {
    category: 'Analytics',
    features: [
      {
        name: 'Basic click tracking',
        basic: true,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Advanced analytics',
        basic: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Custom reports',
        basic: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: 'Security',
    features: [
      {
        name: 'SSL encryption',
        basic: true,
        pro: true,
        enterprise: true,
      },
      {
        name: 'Password protection',
        basic: false,
        pro: true,
        enterprise: true,
      },
      {
        name: 'SSO integration',
        basic: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
];

const ComparisonTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Feature
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Basic
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Pro
            </th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-900">
              Enterprise
            </th>
          </tr>
        </thead>
        <tbody>
          {featureComparisons.map((category) => (
            <React.Fragment key={category.category}>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td
                  colSpan={4}
                  className="px-6 py-4 text-sm font-semibold text-gray-900"
                >
                  {category.category}
                </td>
              </tr>
              {category.features.map((feature) => (
                <tr
                  key={feature.name}
                  className="border-b border-gray-200 transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="group relative">
                      <span className="text-sm text-gray-900">
                        {feature.name}
                      </span>
                      {feature.description && (
                        <div className="absolute -top-2 left-full ml-2 hidden w-48 rounded-lg bg-gray-900 p-2 text-xs text-white group-hover:block">
                          {feature.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {feature.basic ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Minus className="h-5 w-5 text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {feature.pro ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Minus className="h-5 w-5 text-gray-300" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {feature.enterprise ? (
                      <Check className="h-5 w-5 text-indigo-600" />
                    ) : (
                      <Minus className="h-5 w-5 text-gray-300" />
                    )}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
