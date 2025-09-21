// src/components/ui/SuccessCard.jsx
import { CheckCircle2 } from "lucide-react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";

const SuccessCard = ({
    title,
    message,
    primaryAction,
    secondaryAction,
    primaryLabel = "Continuar",
    secondaryLabel = "Voltar"
}) => {
    return (
        <Card>
            <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-5 text-white text-center">
                <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 size={24} />
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
            </div>

            <div className="p-6">
                <div className="flex flex-col items-center mb-6">
                    <div className="rounded-full bg-green-100 p-4 mb-4">
                        <CheckCircle2 className="text-green-600" size={40} />
                    </div>
                    <p className="text-green-700 font-medium text-center">{message}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    {secondaryAction && (
                        <Button
                            onClick={secondaryAction}
                            variant="outline"
                            className="flex-1"
                        >
                            {secondaryLabel}
                        </Button>
                    )}
                    <Button
                        onClick={primaryAction}
                        variant="primary"
                        className="flex-1"
                    >
                        {primaryLabel}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default SuccessCard;