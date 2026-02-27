import { Link, NavLink, useNavigate } from 'react-router'
import { Calendar, ChefHat, Home, LogOut, Settings, ShoppingCart, UtensilsCrossed } from 'lucide-react'
import { useAuth } from '../../context/useAuth'

 const navLinks = [
    { to: '/dashboard', icon: Home, text: 'Dashboard' },
    { to: '/pantry', icon: UtensilsCrossed, text: 'Pantry' },
    { to: '/generate', icon: ChefHat, text: 'Generate' },
    { to: '/recipes', icon: UtensilsCrossed, text: 'Recipes' },
    { to: '/meal-plan', icon: Calendar, text: 'Meal Plan' },
    { to: '/shopping-list', icon: ShoppingCart, text: 'Shopping' }
  ];

const Navbar = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  }

  return (
   <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to='/dashboard' className='flex items-center gap-2 text-lg font-semibold text-gray-900'>
            <ChefHat className='size-7 text-emerald-500' />
            <span>Ai Recipe Generator</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={ 
                ({ isActive }) => 
                  `group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 
                  ${ isActive  ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900' }
                  ` 
              }>
                {
                  ({ isActive }) => (
                    <>
                      <link.icon
                        size={18}
                        strokeWidth={2.5}
                        className={`transition-transform duration-200 ${ isActive ? '' : 'group-hover:scale-110' }`}
                      />
                      {link.text}
                    </>
                  )
                }
              </NavLink>
          ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <Link to='/setting' className='p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors' >
              <Settings className='size-5' />
            </Link>
            <button 
              onClick={handleLogout}
              className='flex items-center gap-2 px-2 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
            >
              <LogOut className='size-4' />
              <span className='hidden sm:inline font-semibold'>Logout</span>
            </button>
          </div>

      </div>
    </div>
   </div>
  )
}

export default Navbar