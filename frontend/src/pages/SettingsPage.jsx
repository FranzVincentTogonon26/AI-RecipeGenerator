import Navbar from '../components/layout/Navbar'
import ProfileSection from '../components/layout/Setting/ProfileSection';
import ChangePassword from '../components/layout/Setting/ChangePassword';
import PreferencesSection from '../components/layout/Setting/PreferencesSection';
import DeleteAcount from '../components/layout/Setting/DeleteAcount';

const SettingsPage = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

         {/* Header */}
          <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>

          <div className="space-y-6">

            {/* Profile Section */}
            <ProfileSection />

            {/* Change Password Section */}
            <ChangePassword />

            {/* Preferences Section */}
            <PreferencesSection />

            {/* Danger Zone */}
            <DeleteAcount />

          </div>
      </div>
    </div>
  )
}

export default SettingsPage