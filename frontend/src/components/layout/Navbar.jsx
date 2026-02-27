import { Link, useNavigate } from 'react-router'
import { Calendar, ChefHat, Home, LogOut, Settings, ShoppingCart, UtensilsCrossed } from 'lucide-react'
import { useAuth } from '../../context/useAuth'

const NavLink = ({to, icon, label}) => {
    return (
      <Link
        to={to}
        className='flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors'
      >
        {icon}
        <span>{label}</span>
      </Link>
    )
  }

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
            <NavLink to='/dashboard' icon={ <Home className='size-4' /> } label='Dashboard' />
            <NavLink to='/pantry' icon={ <UtensilsCrossed className='size-4' /> } label='Pantry' />
            <NavLink to='/generate' icon={ <ChefHat className='size-4' /> } label='Generate' />
            <NavLink to='/recipes' icon={ <UtensilsCrossed className='size-4' /> } label='Recipes' />
            <NavLink to='/meal-plan' icon={ <Calendar className='size-4' /> } label='Meal Plan' />
            <NavLink to='/shopping-list' icon={ <ShoppingCart className='size-4' /> } label='Shooping' />
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