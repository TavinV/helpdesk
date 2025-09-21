// src/components/ui/LoadingSpinner.jsx
const LoadingSpinner = ({ size = "medium", text = "Carregando..." }) => {
    const sizeClasses = {
        small: "w-8 h-8",
        medium: "w-12 h-12",
        large: "w-16 h-16"
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className={`${sizeClasses[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4`}
            ></div>
            {text && <p className="text-gray-600">{text}</p>}
        </div>
    );
};

export default LoadingSpinner;