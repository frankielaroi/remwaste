import React from 'react';
import { MapPin, Recycle, Truck, FileText, Calendar, CreditCard } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { icon: MapPin, label: 'Postcode', color: 'text-teal-500' },
  { icon: Recycle, label: 'Waste Type', color: 'text-teal-500' },
  { icon: Truck, label: 'Select Skip', color: 'text-teal-500' },
  { icon: FileText, label: 'Permit', color: 'text-gray-400' },
  { icon: Calendar, label: 'Date', color: 'text-gray-400' },
  { icon: CreditCard, label: 'Payment', color: 'text-gray-400' },
];

export default function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-12">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index + 1 <= currentStep;
          const isCurrentStep = index + 1 === currentStep;
          
          return (
            <div
              key={index}
              className="flex flex-col items-center relative"
            >
              <div
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 mb-2
                  transform hover:scale-110
                  ${isActive 
                    ? 'bg-teal-500 text-white shadow-lg animate-pulse' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }
                  ${isCurrentStep ? 'ring-4 ring-teal-100 scale-110 animate-bounce' : ''}
                `}
              >
                <StepIcon size={20} className={isCurrentStep ? 'animate-pulse' : ''} />
              </div>
              <span
                className={`
                  text-xs font-medium transition-all duration-300 text-center
                  ${isActive ? 'text-teal-600 font-semibold' : 'text-gray-400'}
                  ${isCurrentStep ? 'animate-pulse' : ''}
                `}
              >
                {step.label}
              </span>
              
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    absolute top-6 left-full h-0.5 transition-all duration-700 hidden sm:block
                    ${isActive && index + 1 < currentStep 
                      ? 'bg-gradient-to-r from-teal-500 to-teal-400 animate-pulse' 
                      : 'bg-gray-200'
                    }
                  `}
                  style={{ width: 'calc(100vw / 6 - 3rem)' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}