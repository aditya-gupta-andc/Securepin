import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Delete } from "lucide-react";

interface NumpadProps {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
}

export function Numpad({ onKeyPress, onBackspace }: NumpadProps) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'backspace'];

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[280px] mx-auto">
      {keys.map((key, index) => (
        <motion.div
          key={index}
          whileTap={{ scale: 0.95 }}
          className="aspect-square"
        >
          {key === 'backspace' ? (
            <Button
              type="button"
              variant="outline"
              className="w-full h-full text-lg font-medium"
              onClick={onBackspace}
            >
              <Delete className="h-6 w-6" />
            </Button>
          ) : key ? (
            <Button
              type="button"
              variant="outline"
              className="w-full h-full text-lg font-medium"
              onClick={() => onKeyPress(key)}
            >
              {key}
            </Button>
          ) : (
            <div /> // Empty space for grid alignment
          )}
        </motion.div>
      ))}
    </div>
  );
}