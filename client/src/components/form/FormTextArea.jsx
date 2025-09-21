// src/components/form/FormTextarea.jsx
const FormTextarea = ({
    label,
    value,
    onChange,
    placeholder,
    required = false,
    error,
    rows = 4,
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
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                rows={rows}
                className={`
          w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition
          ${error ? 'border-red-300' : 'border-gray-300'}
          ${className}
        `}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormTextarea;