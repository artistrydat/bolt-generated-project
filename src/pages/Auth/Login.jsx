import { useState } from 'react'
    import { useForm } from 'react-hook-form'
    import { z } from 'zod'
    import { zodResolver } from '@hookform/resolvers/zod'
    import { useAuth } from '../../context/AuthContext'
    import { googleProvider, facebookProvider } from '../../firebase'
    import { useNavigate } from 'react-router-dom'
    import toast from 'react-hot-toast'

    const loginSchema = z.object({
      email: z.string().email('Invalid email'),
      password: z.string().min(6, 'Password must be at least 6 characters')
    })

    export default function Login() {
      const { login, socialLogin } = useAuth()
      const navigate = useNavigate()
      const [error, setError] = useState('')
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
      })

      const onSubmit = async ({ email, password }) => {
        try {
          await login(email, password)
          navigate('/')
          toast.success('Logged in successfully!')
        } catch (err) {
          setError(err.message)
        }
      }

      const handleSocialLogin = async (provider) => {
        try {
          await socialLogin(provider)
          navigate('/')
          toast.success('Logged in successfully!')
        } catch (err) {
          setError(err.message)
        }
      }

      return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                {...register('email')}
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                {...register('password')}
                className="w-full p-2 border rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          <div className="mt-6 space-y-4">
            <button
              onClick={() => handleSocialLogin(googleProvider)}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin(facebookProvider)}
              className="w-full bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
            >
              Continue with Facebook
            </button>
          </div>
        </div>
      )
    }
