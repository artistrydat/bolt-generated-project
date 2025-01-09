import { useState } from 'react'
    import { useForm } from 'react-hook-form'
    import { z } from 'zod'
    import { zodResolver } from '@hookform/resolvers/zod'

    const tripSchema = z.object({
      destination: z.string().min(1, 'Destination is required'),
      startDate: z.string().min(1, 'Start date is required'),
      endDate: z.string().min(1, 'End date is required'),
      budget: z.number().min(0, 'Budget must be positive'),
      travelers: z.number().min(1, 'At least one traveler is required')
    })

    export default function Home() {
      const [itineraries, setItineraries] = useState([])
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(tripSchema)
      })

      const onSubmit = (data) => {
        const newItinerary = {
          id: crypto.randomUUID(),
          ...data,
          status: 'draft'
        }
        setItineraries([...itineraries, newItinerary])
      }

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8">Plan Your Next Adventure</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
            <div className="grid gap-4">
              <div>
                <label className="block mb-1">Destination</label>
                <input
                  {...register('destination')}
                  className="w-full p-2 border rounded"
                />
                {errors.destination && (
                  <p className="text-red-500 text-sm">{errors.destination.message}</p>
                )}
              </div>
              {/* Add more form fields here */}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create Itinerary
              </button>
            </div>
          </form>
        </div>
      )
    }
