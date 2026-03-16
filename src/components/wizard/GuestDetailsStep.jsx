import React from 'react';
import { useForm } from 'react-hook-form';

const GuestDetailsStep = ({ data, onNext, onBack }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: data
  });

  const guestCount = watch('guestCount');
  const outstationPercentage = watch('outstationPercentage');

  const calculateOutstationGuests = () => {
    if (!guestCount || !outstationPercentage) return 0;
    return Math.ceil(guestCount * (outstationPercentage / 100));
  };

  const calculateRoomsNeeded = () => {
    const outstationGuests = calculateOutstationGuests();
    return Math.ceil(outstationGuests / 2);
  };

  const onSubmit = (formData) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Couple Names */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bride's Full Name
          </label>
          <input
            type="text"
            {...register('brideName', { required: 'Bride name is required' })}
            className="input-field"
            placeholder="Enter bride's name"
          />
          {errors.brideName && (
            <p className="mt-1 text-sm text-indian-red-500">{errors.brideName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Groom's Full Name
          </label>
          <input
            type="text"
            {...register('groomName', { required: 'Groom name is required' })}
            className="input-field"
            placeholder="Enter groom's name"
          />
          {errors.groomName && (
            <p className="mt-1 text-sm text-indian-red-500">{errors.groomName.message}</p>
          )}
        </div>
      </div>

      {/* Wedding Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Wedding Date
        </label>
        <input
          type="date"
          {...register('weddingDate', { required: 'Wedding date is required' })}
          className="input-field"
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.weddingDate && (
          <p className="mt-1 text-sm text-indian-red-500">{errors.weddingDate.message}</p>
        )}
      </div>

      {/* Guest Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estimated Guest Count
        </label>
        <input
          type="number"
          {...register('guestCount', { 
            required: 'Guest count is required',
            min: { value: 10, message: 'Minimum 10 guests' },
            max: { value: 5000, message: 'Maximum 5000 guests' }
          })}
          className="input-field"
          placeholder="e.g., 500"
        />
        {errors.guestCount && (
          <p className="mt-1 text-sm text-indian-red-500">{errors.guestCount.message}</p>
        )}
      </div>

      {/* Outstation Percentage */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Outstation Guests Percentage
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            {...register('outstationPercentage', { 
              required: 'Please specify outstation percentage',
              min: 0,
              max: 100
            })}
            className="w-full accent-saffron-500"
            min="0"
            max="100"
          />
          <span className="text-lg font-bold text-saffron-600 min-w-[60px]">
            {outstationPercentage || 0}%
          </span>
        </div>
        {guestCount && (
          <div className="mt-2 p-3 bg-saffron-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Outstation guests:</span> {calculateOutstationGuests()} people
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Rooms needed:</span> {calculateRoomsNeeded()} rooms
            </p>
          </div>
        )}
      </div>

      {/* Room Blocks (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Room Blocks (Optional)
        </label>
        <input
          type="number"
          {...register('roomBlocks')}
          className="input-field"
          placeholder="Number of room blocks (default: 1)"
          min="1"
        />
        <p className="text-xs text-gray-500 mt-1">Number of nights accommodation needed</p>
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
          Next: Functions →
        </button>
      </div>
    </form>
  );
};

export default GuestDetailsStep;