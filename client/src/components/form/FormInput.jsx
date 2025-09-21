// src/components/form/FormInput.jsx
const FormInput = ({
    label,
    icon,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
    className = "",
    ...props
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className={`
            w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
            ${icon ? 'pl-10' : 'pl-4'}
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;