import { TriangleAlertIcon } from "lucide-react";

interface FormStatusProps {
  error: string | null;
}

export function FormError({ error }: FormStatusProps) {
  if (!error) return null;

  return (
    <div className="flex w-full items-center justify-start gap-1 rounded-md bg-destructive/10 p-2 text-red-500">
      <span>
        <TriangleAlertIcon size={16} />
      </span>
      <span>{error}</span>
    </div>
  );
}
