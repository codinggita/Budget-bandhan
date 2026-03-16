import React from 'react';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    ${isActive ? 'bg-saffron-500 text-white ring-4 ring-saffron-100' : 
                      isCompleted ? 'bg-emerald-500 text-white' : 
                      'bg-gray-200 text-gray-500'}`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span className={`text-xs mt-1 font-medium ${isActive ? 'text-saffron-600' : 'text-gray-500'}`}>
                  {step.name}
                </span>
              </div>

              {/* Connector Line (except after last step) */}
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${stepNumber < currentStep ? 'bg-emerald-500' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Current Step Description */}
      <div className="text-center mt-4">
        <h2 className="font-heading text-xl text-saffron-600">{steps[currentStep - 1]?.name}</h2>
        <p className="text-sm text-gray-500">{steps[currentStep - 1]?.description}</p>
      </div>
    </div>
  );
};

export default StepIndicator;