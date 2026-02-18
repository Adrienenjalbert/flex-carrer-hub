// Role Comparisons - For programmatic SEO pages targeting "X vs Y" queries
// Example: "bartender vs server salary", "forklift driver vs warehouse worker"

export interface RoleComparison {
  id: string;
  role1Slug: string;
  role2Slug: string;
  searchVolume: 'high' | 'medium' | 'low';
}

// High-value comparison pairs based on search volume
export const roleComparisons: RoleComparison[] = [
  // Hospitality comparisons
  { id: 'bartender-vs-server', role1Slug: 'bartender', role2Slug: 'server', searchVolume: 'high' },
  { id: 'barista-vs-server', role1Slug: 'barista', role2Slug: 'server', searchVolume: 'high' },
  { id: 'host-vs-server', role1Slug: 'host-hostess', role2Slug: 'server', searchVolume: 'medium' },
  { id: 'busser-vs-server', role1Slug: 'busser', role2Slug: 'server', searchVolume: 'medium' },
  { id: 'food-runner-vs-server', role1Slug: 'food-runner', role2Slug: 'server', searchVolume: 'medium' },
  { id: 'line-cook-vs-prep-cook', role1Slug: 'line-cook', role2Slug: 'prep-cook', searchVolume: 'high' },
  { id: 'bartender-vs-barback', role1Slug: 'bartender', role2Slug: 'barback', searchVolume: 'medium' },
  { id: 'dishwasher-vs-busser', role1Slug: 'dishwasher', role2Slug: 'busser', searchVolume: 'medium' },
  { id: 'catering-vs-banquet', role1Slug: 'catering-staff', role2Slug: 'banquet-server', searchVolume: 'medium' },
  
  // Warehouse/Industrial comparisons
  { id: 'forklift-vs-warehouse', role1Slug: 'forklift-driver', role2Slug: 'warehouse-operative', searchVolume: 'high' },
  { id: 'picker-vs-packer', role1Slug: 'picker-packer', role2Slug: 'order-selector', searchVolume: 'medium' },
  { id: 'delivery-driver-vs-warehouse', role1Slug: 'delivery-driver', role2Slug: 'warehouse-operative', searchVolume: 'high' },
  { id: 'package-handler-vs-warehouse', role1Slug: 'package-handler', role2Slug: 'warehouse-operative', searchVolume: 'high' },
  { id: 'material-handler-vs-forklift', role1Slug: 'material-handler', role2Slug: 'forklift-driver', searchVolume: 'medium' },
  { id: 'machine-operator-vs-assembler', role1Slug: 'machine-operator', role2Slug: 'assembler', searchVolume: 'medium' },
  
  // Retail comparisons
  { id: 'cashier-vs-sales-associate', role1Slug: 'cashier', role2Slug: 'sales-associate', searchVolume: 'high' },
  { id: 'stock-vs-cashier', role1Slug: 'stock-associate', role2Slug: 'cashier', searchVolume: 'medium' },
  { id: 'personal-shopper-vs-cashier', role1Slug: 'personal-shopper', role2Slug: 'cashier', searchVolume: 'medium' },
  { id: 'merchandiser-vs-stock', role1Slug: 'merchandiser', role2Slug: 'stock-associate', searchVolume: 'medium' },
  
  // Facilities comparisons
  { id: 'cleaner-vs-janitor', role1Slug: 'cleaner', role2Slug: 'janitor', searchVolume: 'high' },
  { id: 'housekeeper-vs-cleaner', role1Slug: 'housekeeper', role2Slug: 'cleaner', searchVolume: 'medium' },
  { id: 'security-vs-maintenance', role1Slug: 'security-guard', role2Slug: 'maintenance-worker', searchVolume: 'medium' },
  
  // Cross-industry comparisons
  { id: 'server-vs-cashier', role1Slug: 'server', role2Slug: 'cashier', searchVolume: 'high' },
  { id: 'bartender-vs-security', role1Slug: 'bartender', role2Slug: 'security-guard', searchVolume: 'low' },
  { id: 'warehouse-vs-retail', role1Slug: 'warehouse-operative', role2Slug: 'retail-assistant', searchVolume: 'medium' },
  { id: 'delivery-vs-valet', role1Slug: 'delivery-driver', role2Slug: 'valet', searchVolume: 'low' },
];

// Helper functions
export const getComparisonById = (id: string) =>
  roleComparisons.find(c => c.id === id);

export const getComparisonBySlugs = (slug1: string, slug2: string) =>
  roleComparisons.find(c => 
    (c.role1Slug === slug1 && c.role2Slug === slug2) ||
    (c.role1Slug === slug2 && c.role2Slug === slug1)
  );

export const getAllComparisonSlugs = () =>
  roleComparisons.map(c => `${c.role1Slug}-vs-${c.role2Slug}`);

export const getComparisonsForRole = (roleSlug: string) =>
  roleComparisons.filter(c => c.role1Slug === roleSlug || c.role2Slug === roleSlug);

