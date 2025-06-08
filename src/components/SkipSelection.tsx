import { useState, useEffect } from 'react';
import { ChevronLeft, Sparkles, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import StepProgress from './StepProgress';
import SkipCard from './SkipCard';
import { SkipOption } from '../types/skip';
import { fetchSkipsByLocation } from '../services/skipService';
import { transformApiResponseToSkipOptions } from '../utils/skipUtils';

export default function SkipSelection() {
  const [selectedSkip, setSelectedSkip] = useState<SkipOption | null>(null);
  const [skipOptions, setSkipOptions] = useState<SkipOption[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkips = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch skips for NR32 postcode and Lowestoft area
        const apiSkips = await fetchSkipsByLocation('LE10', 'Hinckley');
        const transformedSkips = transformApiResponseToSkipOptions(apiSkips);
        
        setSkipOptions(transformedSkips);
        
        // Trigger entrance animation after data is loaded
        setTimeout(() => {
          setIsLoaded(true);
          setIsLoading(false);
        }, 300);
        
      } catch (err) {
        console.error('Failed to load skips:', err);
        setError('Failed to load skip options. Please try again.');
        setIsLoading(false);
      }
    };

    loadSkips();
  }, []);

  const handleSkipSelect = (skip: SkipOption) => {
    if (selectedSkip?.id === skip.id) {
      setSelectedSkip(null); // Unselect if already selected
    } else {
      setSelectedSkip(skip);
    }
  };

  const handleBackToWasteType = () => {
    // Handle navigation back to waste type selection
    console.log('Navigate back to waste type');
  };

  const handleContinue = () => {
    if (selectedSkip) {
      // Handle navigation to next step
      console.log('Continue to next step with selected skip:', selectedSkip);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Skip Options</h2>
          <p className="text-gray-500">Finding the best skips for your area...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Unable to Load Skips</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Step Progress */}
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <StepProgress currentStep={3} totalSteps={6} />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-teal-500 animate-spin" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-teal-600 to-gray-900 bg-clip-text text-transparent">
                Choose Your Skip Size
              </h1>
              <Sparkles className="w-8 h-8 text-teal-500 animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find the perfect skip for your project. We've got sizes for every need, from small 
              clearouts to major renovations.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Showing {skipOptions.length} available skips for NR32, Lowestoft
            </div>
          </div>

          {/* Skip Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {skipOptions.map((skip, index) => (
              <div
                key={skip.id}
                className={`transform transition-all duration-700 ${
                  isLoaded 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${400 + index * 200}ms` }}
              >
                <SkipCard
                  skip={skip}
                  isSelected={selectedSkip?.id === skip.id}
                  onSelect={handleSkipSelect}
                />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 transform transition-all duration-1000 delay-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={handleBackToWasteType}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 transition-all duration-300 group hover:bg-white hover:shadow-md rounded-xl"
            >
              <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-2" />
              <span className="font-medium">Back to Waste Type</span>
            </button>

            {selectedSkip && (
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 animate-fadeInUp"
              >
                Continue to Permit Check →
              </button>
            )}
          </div>

          {/* Selected Skip Summary */}
          {selectedSkip && (
            <div className="mt-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-100 animate-slideInUp">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-teal-500" />
                    Selected: {selectedSkip.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {selectedSkip.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-teal-600 animate-pulse">
                    £{Math.round(selectedSkip.price_before_vat + (selectedSkip.price_before_vat * selectedSkip.vat / 100))}
                  </div>
                  <div className="text-xs text-gray-500">inc. VAT</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}