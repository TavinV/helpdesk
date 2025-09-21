// src/components/ui/InfoItem.jsx
const InfoItem = ({ label, value, icon }) => {
    return (
        <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
            <div className="flex items-center gap-2">
                <p className="text-gray-800">{value}</p>
                {icon}
            </div>
        </div>
    );
};

export default InfoItem;