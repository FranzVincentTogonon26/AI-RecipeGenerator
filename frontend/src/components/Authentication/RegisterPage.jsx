import React, { useState } from 'react'
import { ArrowRight, Lock, Mail, User, } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import toast from 'react-hot-toast';

import authService from '../../services/authService'

const Register = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await authService.register( username, email, password );
      toast.success('Registration Successfully..')
      navigate('/login');
    } catch (error) {
      setError( error.message || 'Failed to Register..');
      toast.error( error.message || 'Failed to Register.. ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-bl from-[#ffe4e6] to-[#ccfbf1]">
      <div className="relative w-full max-w-md px-6">
        <div className="border  bg-white/80 backdrop-blur-xl border-slate-200/60 rounded-xl shadow-xl shadow-slate-200/60 p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className='text-3xl font-bold text-slate-700 tracking-tight'>Create an Account</h1>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 text-slate-400">
                  <User className='size-5' strokeWidth={2} />
                </div>
                <input
                  className='w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10'
                  value={username}
                  onChange={(e) => setUsername(e.target.value) }
                  type='text'
                  placeholder='Your name..'
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 text-slate-400">
                  <Mail className='size-5' strokeWidth={2} />
                </div>
                <input
                  className='w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10'
                  value={email}
                  onChange={(e) => setEmail(e.target.value) }
                  type='text'
                  placeholder='your@email.com'
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wide">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 text-slate-400">
                  <Lock className='size-5' strokeWidth={2} />
                </div>
                <input 
                  type="password" 
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value) }
                  placeholder='******'
                />
              </div>
            </div>

            {/* Error here */}
            {
              error && (
                <div className="rounded-xl bg-red-50 border-2 border-red-200 p-3">
                  <p className="text-xs text-red-600 font-mediun text-center">{error}</p>
                </div>
              )
            }

            <button
              onClick={handleSubmit}
              disabled={loading}
              type='button'
              className='group relative w-full h-12 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-emeral-500/25 overflow-hidden'
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {
                  loading ? (
                    <>
                      <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-200' strokeWidth={2.5} />
                    </>
                  )
                }
              </span>
              <div className='absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700'  />
            </button>
          </div>

          {/* Footer */}
            <div className="space-y-4 p-6">
                <div className='flex items-center justify-center '>
                  <p className="text-center text-xs text-slate-600 block  font-semibold tracking-wide">
                  Or Sign Up Using
                  </p>
              </div>
              <div className="flex items-center justify-center tracking-wide">
                  <Link to='/login' className='text-xs uppercase font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200'>
                    Sign In
                  </Link>
              </div>
            </div>

        </div>

        {/* Subtle footer text */}
        <p className="text-center text-xs text-slate-400 mt-6">
          By contiuning, you agree to our Terms & Privacy Policy
        </p>

      </div>
    </div>
  )
}

export default Register