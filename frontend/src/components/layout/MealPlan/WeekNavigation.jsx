import { addDays, startOfWeek } from 'date-fns';

const WeekNavigation = ({ weekStart, setWeekStart }) => {
  return (
    <div className="flex items-center gap-3">
        <button
            onClick={() => setWeekStart(addDays(weekStart, -7))}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
        >
            Previous Week
        </button>
        <button
            onClick={() => setWeekStart(startOfWeek(new Date()))}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
        >
            This Week
        </button>
        <button
            onClick={() => setWeekStart(addDays(weekStart, 7))}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
        >
            Next Week
        </button>
    </div>
  )
}

export default WeekNavigation