// src/components/ui/Modal.jsx
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import IconInput from "./IconInput.jsx";

const Modal = ({
    children,
    onClose,
    title,
    showClose = true,
    overlayOpacity = 0.5,
    confirmProps, // { message, onConfirm, onCancel, confirmText, cancelText }
    inputs = [], // [{ icon, placeholder, type, value, onChange, label, maxLength }]
}) => {
    return createPortal(
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 z-40 backdrop-blur-sm transition-opacity"
                style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity})` }}
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 md:p-8 relative animate-fade-in">
                    {/* Botão de fechar */}
                    {showClose && (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                        >
                            <X size={24} />
                        </button>
                    )}

                    {/* Título */}
                    {title && <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>}

                    {/* Inputs (opcional) */}
                    {inputs.length > 0 &&
                        inputs.map((input, idx) => (
                            <div key={idx} className="mb-4">
                                <label className="font-semibold mb-1 block">{input.label}</label>
                                <IconInput
                                    placeholder={input.placeholder}
                                    icon={input.icon}
                                    type={input.type}
                                    value={input.value}
                                    onChange={input.onChange}
                                    maxLength={input.maxLength}
                                />
                            </div>
                        ))}

                    {/* Conteúdo customizável */}
                    <div className="space-y-4">{children}</div>

                    {/* Modal de confirmação */}
                    {confirmProps && (
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={confirmProps.onCancel || onClose}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
                            >
                                {confirmProps.cancelText || "Cancelar"}
                            </button>
                            <button
                                onClick={confirmProps.onConfirm}
                                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                {confirmProps.confirmText || "Confirmar"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;
