import Navbar from '../components/layout/Navbar'
import StatCard from '../components/layout/Dashboard/StatCard';
import QuickAction from '../components/layout/Dashboard/QuickAction';
import RecentRecipes from '../components/layout/Dashboard/RecentRecipes';
import UpcomingMeals from '../components/layout/Dashboard/UpcomingMeals';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
       <Navbar />
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
           {/* Header */}
            <div className='mb-6'>
               <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
               <p className="text-gray-600 mt-1">Welcome back!.. Here's your cooking overview</p>
            </div>
            {/* Stats Cards */}
            <StatCard />
            {/* Quick Actions */}
            <QuickAction />
            {/* Recent Recipes & Upcoming Meals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Recipes */}
              <RecentRecipes />
              {/* Upcoming Meals */}
              <UpcomingMeals />
            </div>
        </div>
    </div>
  )
}

export default DashboardPage