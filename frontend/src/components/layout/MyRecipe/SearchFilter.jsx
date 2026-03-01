import { Search } from 'lucide-react'

const SearchFilter = ({
    cuisines,
    difficulties,
    searchQuery,
    setSearchQuery,
    selectedCuisine,
    setSelectedCuisine,
    selectedDifficulty,
    setSelectedDifficulty
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
        </div>
        {/* Cuisine Filter */}
        <select
            value={selectedCuisine}
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="select h-11  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        >
            {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>
                    {cuisine === 'All' ? 'All Cuisines' : cuisine}
                </option>
            ))}
        </select>
        {/* Difficulty Filter */}
        <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="select h-11  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        >
            {difficulties.map(diff => (
                <option key={diff} value={diff}>
                    {diff === 'All' ? 'All Difficulties' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                </option>
            ))}
        </select>
    </div>
  )
}

export default SearchFilter