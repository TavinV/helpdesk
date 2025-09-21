// src/components/ui/FilterBar.jsx
import { Search, Filter } from "lucide-react";

const FilterBar = ({
    searchTerm,
    onSearchChange,
    filters = [],
    onFilterChange,
    sortOptions = [],
    onSortChange,
    className = ""
}) => {
    return (
        <Card padding="small" className={className}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                </div>

                {/* Filter Dropdown */}
                {filters.length > 0 && (
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Filter size={18} className="text-gray-400" />
                        </div>
                        <select
                            value={filters.find(f => f.selected)?.value || ""}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                        >
                            {filters.map((filter) => (
                                <option key={filter.value} value={filter.value}>
                                    {filter.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Sort Dropdown */}
                {sortOptions.length > 0 && (
                    <select
                        value={sortOptions.find(s => s.selected)?.value || ""}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </Card>
    );
};

export default FilterBar;