import React from 'react';
import { useNavigate } from 'react-router-dom';

const BudgetResultsStep = ({ data, budgetResults, onSave, onBack, isEditing = false }) => {
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getConfidenceLevel = () => {
    if (!budgetResults) return 'medium';
    const range = budgetResults.total.high - budgetResults.total.low;
    const percentage = (range / budgetResults.total.medium) * 100;
    if (percentage < 20) return 'high';
    if (percentage < 40) return 'medium';
    return 'low';
  };

  if (!budgetResults) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-saffron-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Calculating your budget...</p>
      </div>
    );
  }

  const confidenceLevel = getConfidenceLevel();
  const confidenceColors = {
    high: 'text-emerald-600 bg-emerald-100',
    medium: 'text-saffron-600 bg-saffron-100',
    low: 'text-indian-red-600 bg-indian-red-100'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-heading text-3xl text-saffron-600 mb-2">Your Wedding Budget</h2>
        <p className="text-gray-600">Based on your selections in {data.city}</p>
      </div>

      {/* Total Budget Card */}
      <div className="bg-gradient-to-r from-saffron-500 to-emerald-500 text-white rounded-xl p-6 shadow-lg">
        <p className="text-sm opacity-90 mb-1">Estimated Total Budget</p>
        <div className="flex items-baseline justify-center gap-4">
          <span className="text-3xl">{formatCurrency(budgetResults.total.low)}</span>
          <span className="text-xl">-</span>
          <span className="text-3xl">{formatCurrency(budgetResults.total.high)}</span>
        </div>
        <p className="text-sm mt-2 opacity-90">
          Medium estimate: {formatCurrency(budgetResults.total.medium)}
        </p>
        <div className="mt-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${confidenceColors[confidenceLevel]}`}>
            Confidence: {confidenceLevel.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow">
        <h3 className="font-heading text-xl text-saffron-600 mb-4">Budget Breakdown</h3>
        
        <div className="space-y-4">
          {/* Food & Beverage */}
          <div className="border-b pb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Food & Beverage</span>
              <span className="text-sm text-gray-500">per plate</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600">{formatCurrency(budgetResults.foodCost.low)}</span>
              <span className="text-saffron-600">{formatCurrency(budgetResults.foodCost.medium)}</span>
              <span className="text-purple-600">{formatCurrency(budgetResults.foodCost.high)}</span>
            </div>
          </div>

          {/* Venue Rent */}
          <div className="border-b pb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Venue Rent</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600">{formatCurrency(budgetResults.venueRent.low)}</span>
              <span className="text-saffron-600">{formatCurrency(budgetResults.venueRent.medium)}</span>
              <span className="text-purple-600">{formatCurrency(budgetResults.venueRent.high)}</span>
            </div>
          </div>

          {/* Decor */}
          <div className="border-b pb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Decor & Lighting</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600">{formatCurrency(budgetResults.decorCost.low)}</span>
              <span className="text-saffron-600">{formatCurrency(budgetResults.decorCost.medium)}</span>
              <span className="text-purple-600">{formatCurrency(budgetResults.decorCost.high)}</span>
            </div>
          </div>

          {/* Accommodation */}
          <div className="border-b pb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">Accommodation</span>
              <span className="text-xs text-gray-500">{data.outstationPercentage}% outstation</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600">{formatCurrency(budgetResults.accommodationCost.low)}</span>
              <span className="text-saffron-600">{formatCurrency(budgetResults.accommodationCost.medium)}</span>
              <span className="text-purple-600">{formatCurrency(budgetResults.accommodationCost.high)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Per Person */}
      <div className="bg-saffron-50 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Cost Per Guest</span>
          <div className="flex gap-3">
            <span className="text-emerald-600">{formatCurrency(budgetResults.breakdown.perPerson.low)}</span>
            <span className="text-saffron-600">{formatCurrency(budgetResults.breakdown.perPerson.medium)}</span>
            <span className="text-purple-600">{formatCurrency(budgetResults.breakdown.perPerson.high)}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          ← Adjust Details
        </button>
        <button
          type="button"
          onClick={onSave}
          className="btn-primary px-8 py-2"
        >
          {isEditing ? 'Update Wedding Plan' : 'Save Wedding Plan'}
        </button>
      </div>
    </div>
  );
};

export default BudgetResultsStep;