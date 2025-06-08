import { ApiSkipResponse } from '../services/skipService';
import { SkipOption } from '../types/skip';

// Skip size to image mapping
const skipImages: Record<number, string> = {
  4: "https://images.pexels.com/photos/8961503/pexels-photo-8961503.jpeg?auto=compress&cs=tinysrgb&w=800",
  6: "https://images.pexels.com/photos/8961423/pexels-photo-8961423.jpeg?auto=compress&cs=tinysrgb&w=800",
  8: "https://images.pexels.com/photos/8961497/pexels-photo-8961497.jpeg?auto=compress&cs=tinysrgb&w=800",
  10: "https://images.pexels.com/photos/8961501/pexels-photo-8961501.jpeg?auto=compress&cs=tinysrgb&w=800",
  12: "https://images.pexels.com/photos/8961499/pexels-photo-8961499.jpeg?auto=compress&cs=tinysrgb&w=800",
  14: "https://images.pexels.com/photos/8961495/pexels-photo-8961495.jpeg?auto=compress&cs=tinysrgb&w=800",
  16: "https://images.pexels.com/photos/8961493/pexels-photo-8961493.jpeg?auto=compress&cs=tinysrgb&w=800",
  20: "https://images.pexels.com/photos/8961491/pexels-photo-8961491.jpeg?auto=compress&cs=tinysrgb&w=800",
  40: "https://images.pexels.com/photos/8961489/pexels-photo-8961489.jpeg?auto=compress&cs=tinysrgb&w=800"
};

// Generate skip descriptions based on size
const generateSkipDescription = (size: number, allowsHeavyWaste: boolean, allowedOnRoad: boolean): string => {
  const baseDescriptions: Record<number, string> = {
    4: "Great for small clearouts & garden waste. Perfect for household decluttering.",
    6: "Ideal for kitchen or bathroom refits. Popular choice for home renovations.",
    8: "Perfect for larger home projects and office clearouts. Great capacity for mixed waste.",
    10: "Excellent for major renovations and construction projects. High capacity option.",
    12: "Ideal for large-scale clearouts and commercial projects. Substantial waste capacity.",
    14: "Perfect for major construction and demolition work. Professional-grade capacity.",
    16: "Excellent for large commercial projects and major renovations. Heavy-duty option.",
    20: "Industrial-grade skip for major construction and commercial projects.",
    40: "Maximum capacity for large-scale industrial and commercial waste disposal."
  };

  let description = baseDescriptions[size] || `${size} yard skip for your waste disposal needs.`;
  
  if (allowsHeavyWaste) {
    description += " Accepts heavy materials.";
  }
  
  if (!allowedOnRoad) {
    description += " Requires private property placement.";
  }

  return description;
};

// Generate capacity description based on size
const generateCapacity = (size: number): string => {
  const capacityMap: Record<number, string> = {
    4: "30-40 bin bags",
    6: "45-55 bin bags", 
    8: "60-70 bin bags",
    10: "75-85 bin bags",
    12: "90-100 bin bags",
    14: "105-115 bin bags",
    16: "120-130 bin bags",
    20: "150-160 bin bags",
    40: "300+ bin bags"
  };

  return capacityMap[size] || `${size * 7.5}-${size * 8.5} bin bags`;
};

// Determine if a skip should be marked as popular
const isPopularSkip = (size: number): boolean => {
  // Mark 6 and 8 yard skips as popular (most commonly used sizes)
  return size === 6 || size === 8;
};

export const transformApiResponseToSkipOptions = (apiSkips: ApiSkipResponse[]): SkipOption[] => {
  return apiSkips
    .filter(skip => !skip.forbidden) // Filter out forbidden skips
    .map(skip => ({
      ...skip,
      name: `${skip.size} Yard Skip`,
      description: generateSkipDescription(skip.size, skip.allows_heavy_waste, skip.allowed_on_road),
      capacity: generateCapacity(skip.size),
      image: skipImages[skip.size] || skipImages[8], // Default to 8 yard image if size not found
      isPopular: isPopularSkip(skip.size)
    }))
    .sort((a, b) => a.size - b.size); // Sort by size ascending
};