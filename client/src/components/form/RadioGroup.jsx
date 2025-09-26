// components/form/RadioGroup.jsx
const RadioGroup = ({ options, value, onChange, className = "" }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {options.map((option) => (
                <label
                    key={option.value}
                    className={`
                        flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${value === option.value
                            ? 'border-green-500 bg-green-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }
                    `}
                >
                    <input
                        type="radio"
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e) => onChange(e.target.value)}
                        className="mt-1 mr-3 text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            {option.icon}
                            <span className="font-semibold text-gray-900">{option.label}</span>
                        </div>
                        {option.description && (
                            <p className="text-sm text-gray-600 mt-1 ml-6">{option.description}</p>
                        )}
                    </div>
                </label>
            ))}
        </div>
    );
};

export default RadioGroup;