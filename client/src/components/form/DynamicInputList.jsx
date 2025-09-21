// src/components/form/DynamicInputList.jsx
import { Plus, X } from "lucide-react";

const DynamicInputList = ({
    items,
    onItemsChange,
    placeholder,
    addButtonText = "Adicionar",
    minItems = 1,
    maxItems = 10,
    className = ""
}) => {
    const addItem = () => {
        if (items.length < maxItems) {
            onItemsChange([...items, ""]);
        }
    };

    const removeItem = (index) => {
        if (items.length > minItems) {
            const newItems = items.filter((_, i) => i !== index);
            onItemsChange(newItems);
        }
    };

    const updateItem = (index, value) => {
        const newItems = [...items];
        newItems[index] = value;
        onItemsChange(newItems);
    };

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Soluções já Tentadas
            </label>

            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={item}
                            onChange={(e) => updateItem(index, e.target.value)}
                            placeholder={placeholder}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-full transition"
                            disabled={items.length <= minItems}
                            title="Remover"
                        >
                            <X size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {items.length < maxItems && (
                <button
                    type="button"
                    onClick={addItem}
                    className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    <Plus size={16} />
                    {addButtonText}
                </button>
            )}
        </div>
    );
};

export default DynamicInputList;