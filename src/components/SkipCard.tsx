import { CheckCircle } from 'lucide-react';
import { SkipOption } from '../types/skip';

interface SkipCardProps {
  skip: SkipOption;
  isSelected: boolean;
  onSelect: (skip: SkipOption) => void;
}

export default function SkipCard({ skip, isSelected, onSelect }: SkipCardProps) {
  const totalPrice = skip.price_before_vat;

  return (
    <div
      className={`
        relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden
        transform hover:-translate-y-2 hover:scale-105
        ${isSelected ? 'ring-4 ring-teal-500 ring-opacity-50 shadow-2xl scale-105 -translate-y-2' : ''}
      `}
      onClick={() => onSelect(skip)}
    >
      {/* Popular Badge */}
      {skip.isPopular && (
        <div className="absolute top-4 right-4 z-10 animate-pulse">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            Most Popular
          </div>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 left-4 z-10 animate-bounce">
          <CheckCircle className="w-6 h-6 text-teal-500 bg-white rounded-full drop-shadow-lg" fill="currentColor" />
        </div>
      )}

      {/* Skip Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={"https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/40-yarder-skip.jpg"}
          alt={skip.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating price indicator on hover */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-teal-600 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
          £{Math.round(totalPrice)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
            {skip.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-teal-600 transform group-hover:scale-110 transition-transform duration-300">
              £{Math.round(totalPrice)}
            </div>
            <div className="text-xs text-gray-500">ex. VAT</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {skip.description}
        </p>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm transform group-hover:translate-x-1 transition-transform duration-300 delay-75">
            <span className="text-gray-500">Capacity:</span>
            <span className="font-medium text-gray-900">{skip.capacity}</span>
          </div>
          <div className="flex justify-between text-sm transform group-hover:translate-x-1 transition-transform duration-300 delay-100">
            <span className="text-gray-500">Hire Period:</span>
            <span className="font-medium text-gray-900">{skip.hire_period_days} days</span>
          </div>
          {skip.allows_heavy_waste && (
            <div className="flex justify-between text-sm transform group-hover:translate-x-1 transition-transform duration-300 delay-125">
              <span className="text-gray-500">Heavy Waste:</span>
              <span className="font-medium text-green-600">Allowed</span>
            </div>
          )}
          {skip.allowed_on_road && (
            <div className="flex justify-between text-sm transform group-hover:translate-x-1 transition-transform duration-300 delay-150">
              <span className="text-gray-500">Road Placement:</span>
              <span className="font-medium text-green-600">Permitted</span>
            </div>
          )}
        </div>

        <button
          className={`
            w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 text-sm uppercase tracking-wide
            transform hover:scale-105 active:scale-95
            ${isSelected
              ? 'bg-teal-500 text-white shadow-lg animate-pulse'
              : 'bg-gray-100 text-gray-700 hover:bg-teal-500 hover:text-white hover:shadow-lg'
            }
          `}
        >
          {isSelected ? 'Selected ✓' : 'Select This Skip'}
        </button>
      </div>

      {/* Animated border effect */}
      <div className={`
        absolute inset-0 rounded-2xl transition-all duration-500
        ${isSelected ? 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 opacity-20' : 'opacity-0'}
      `} />
    </div>
  );
}