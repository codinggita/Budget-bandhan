import React from 'react';
import { useForm } from 'react-hook-form';
import { CITIES, VENUE_TIERS } from '../../utils/constants/weddingConstants';

const CityVenueStep = ({ data, onNext }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: data
  });

  const selectedCity = watch('city');
  const selectedVenue = watch('venueTier');

  const onSubmit = (formData) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* City Selection */}
      <div>
        <label className="block text-lg font-heading text-saffron-600 mb-4">
          Select Your Wedding City
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {CITIES.map(city => (
            <label
              key={city.id}
              className={`cursor-pointer p-3 rounded-lg border-2 transition-all
                ${selectedCity === city.id 
                  ? 'border-saffron-500 bg-saffron-50' 
                  : 'border-gray-200 hover:border-saffron-300'}`}
            >
              <input
                type="radio"
                value={city.id}
                {...register('city', { required: 'Please select a city' })}
                className="hidden"
              />
              <div className="text-center">
                <span className="text-2xl block mb-1">{city.icon}</span>
                <span className="font-medium text-gray-800">{city.name}</span>
                <span className="text-xs text-gray-500 block">{city.state}</span>
              </div>
            </label>
          ))}
        </div>
        {errors.city && (
          <p className="mt-2 text-sm text-indian-red-500">{errors.city.message}</p>
        )}
      </div>

      {/* Venue Tier Selection */}
      <div className="mt-8">
        <label className="block text-lg font-heading text-saffron-600 mb-4">
          Choose Venue Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VENUE_TIERS.map(venue => (
            <label
              key={venue.id}
              className={`cursor-pointer p-4 rounded-lg border-2 transition-all
                ${selectedVenue === venue.id 
                  ? 'border-emerald-500 bg-emerald-50' 
                  : 'border-gray-200 hover:border-emerald-300'}`}
            >
              <input
                type="radio"
                value={venue.id}
                {...register('venueTier', { required: 'Please select a venue type' })}
                className="hidden"
              />
              <div className="flex items-start gap-3">
                <span className="text-3xl">{venue.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800">{venue.name}</h3>
                  <p className="text-xs text-gray-500">{venue.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.venueTier && (
          <p className="mt-2 text-sm text-indian-red-500">{errors.venueTier.message}</p>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="btn-primary px-8 py-3"
        >
          Next: Guest Details →
        </button>
      </div>
    </form>
  );
};

export default CityVenueStep;