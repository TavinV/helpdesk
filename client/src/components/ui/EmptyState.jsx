// src/components/ui/EmptyState.jsx
import { ClipboardList } from "lucide-react";
import Card from "./Card.jsx";
import Button from "./Button.jsx";

const EmptyState = ({
  icon = <ClipboardList size={48} />,
  title,
  description,
  actionLabel,
  onAction,
  className = ""
}) => {
  return (
    <Card className={`text-center p-8 ${className}`}>
      <div className="mx-auto text-gray-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default EmptyState;