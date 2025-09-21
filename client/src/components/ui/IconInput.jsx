import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const IconInput = ({ icon, type, maxLength, ...props }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible)
    }

    return (
        type === "password" ? <div className="flex gap-3 border-2 border-gray-300 rounded-lg p-2 items-center font-medium">
            <span className="icon text-gray-900">{icon}</span>
            <input className="input w-full text-gray-600 placeholder:text-gray-400 outline-none" maxLength={maxLength || "99"} type={passwordVisible ? "text" : "password"} {...props} />
            <button type="button" onClick={togglePasswordVisibility} className="text-gray-900">
                {passwordVisible ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
        </div> :
            <div className="flex gap-3 border-2 border-gray-300 rounded-lg p-2 items-center font-medium">
                <span className="icon text-gray-900">{icon}</span>
                <input className="input w-full text-gray-600 placeholder:text-gray-400 outline-none" maxLength={maxLength || "99"} type={type || "text"} {...props} />
            </div>
    );
}

export default IconInput;