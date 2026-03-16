import React from 'react';
import { useForm } from 'react-hook-form';
import { FUNCTIONS } from '../../utils/constants/weddingConstants';

const FunctionsStep = ({ data, onNext, onBack }) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: data
  });

  const selectedFunctions = watch('functions') || [];

  const handleFunctionToggle = (functionId) => {
    const current = selectedFunctions.includes(functionId)
      ? selectedFunctions.filter(f => f !== functionId)
      : [...selectedFunctions, functionId];
    setValue('functions', current);
  };

  const onSubmit = (formData) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-lg font-heading text-saffron-600 mb-4">
          Select Wedding Functions
        </label>
        <p className="text-sm text-gray-500 mb-4">
          Choose the functions you're planning to host
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {FUNCTIONS.map(func => (
            <label
              key={func.id}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all
                ${selectedFunctions.includes(func.id) 
                  ? 'border-saffron-500 bg-saffron-50' 
                  : 'border-gray-200 hover:border-saffron-300'}`}
            >
              <input
                type="checkbox"
                value={func.id}
                checked={selectedFunctions.includes(func.id)}
                onChange={() => handleFunctionToggle(func.id)}
                className="hidden"
              />
              <div className="text-center">
                <span className="text-3xl block mb-2">{func.icon}</span>
                <span className="font-medium text-gray-800">{func.name}</span>
                <p className="text-xs text-gray-500 mt-1">{func.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Estimated Budget Range Display */}
      <div className="mt-6 p-4 bg-gradient-to-r from-saffron-50 to-emerald-50 rounded-lg">
        <h3 className="font-heading text-lg text-saffron-600 mb-2">Quick Budget Estimate</h3>
        <p className="text-sm text-gray-600 mb-3">
          Based on {selectedFunctions.length} function(s) selected
        </p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-white p-2 rounded">
            <span className="text-xs text-gray-500">Budget</span>
            <p className="font-bold text-emerald-600">₹15-20L</p>
          </div>
          <div className="bg-white p-2 rounded">
            <span className="text-xs text-gray-500">Moderate</span>
            <p className="font-bold text-saffron-600">₹25-35L</p>
          </div>
          <div className="bg-white p-2 rounded">
            <span className="text-xs text-gray-500">Premium</span>
            <p className="font-bold text-purple-600">₹40-60L+</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="btn-primary px-8 py-2"
        >
          Calculate Budget →
        </button>
      </div>
    </form>
  );
};

export default FunctionsStep;