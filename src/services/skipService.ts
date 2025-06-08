export interface ApiSkipResponse {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

export const fetchSkipsByLocation = async (postode: string, area?: string): Promise<ApiSkipResponse[]> => {
  try {
    const url = new URL('https://app.wewantwaste.co.uk/api/skips/by-location?');
    if (postode) url.searchParams.append('postcode', postode);
    if (area) url.searchParams.append('area', area);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};