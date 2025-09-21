// src/components/ui/Card.jsx
const Card = ({
    children,
    className = "",
    padding = "medium",
    hover = false,
    onClick,
    header,
    footer
}) => {
    const paddingClasses = {
        none: "",
        small: "p-4",
        medium: "p-6",
        large: "p-8"
    };

    const hoverClass = hover ? "hover:shadow-md transition-shadow cursor-pointer" : "";

    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${hoverClass} ${className}`}
            onClick={onClick}
        >
            {/* Header - sem padding do container principal */}
            {header && (
                <div className="border-b border-gray-200">
                    {header}
                </div>
            )}

            {/* Conteúdo principal - com padding */}
            <div className={paddingClasses[padding]}>
                {children}
            </div>

            {/* Footer - sem padding do container principal */}
            {footer && (
                <div className="border-t border-gray-200">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card;