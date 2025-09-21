// src/components/ui/InfoCard.jsx
const InfoCard = ({
    title,
    icon,
    children,
    className = "",
    cols = 1
}) => {
    const colClasses = {
        1: "md:col-span-1",
        2: "md:col-span-2"
    };

    return (
        <div className={`bg-gray-50 p-5 rounded-xl border border-gray-200 ${colClasses[cols]} ${className}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-full">
                    {icon}
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            </div>
            {children}
        </div>
    );
};

export default InfoCard;