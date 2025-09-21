// src/components/ui/Button.jsx
import { Loader2 } from "lucide-react";

const Button = ({
    children,
    variant = "primary",
    size = "medium",
    loading = false,
    disabled = false,
    type = "button",
    onClick,
    className = "",
    icon,
    ...props
}) => {
    const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
        ghost: "text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:ring-blue-500"
    };

    const sizes = {
        small: "px-3 py-2 text-sm",
        medium: "px-4 py-2",
        large: "px-6 py-3 text-lg"
    };

    const disabledClasses = disabled || loading ? "opacity-50 cursor-not-allowed" : "";

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={classes}
            {...props}
        >
            {loading && <Loader2 size={18} className="animate-spin mr-2" />}
            {icon && !loading && <span className="mr-2">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;