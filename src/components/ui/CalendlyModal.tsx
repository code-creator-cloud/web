// CalendlyModal.tsx
import { Dialog, DialogContent } from "./dialog";
import { InlineWidget } from "react-calendly";
import { X, Video } from 'lucide-react';
import { Button } from "./button";

interface CalendlyModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CalendlyModal({ open, onClose }: CalendlyModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] bg-white border-0 p-0 overflow-hidden rounded-lg">
        {/* Compact Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#1a0f3a] to-[#2d1b69]">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-[var(--color-accent)]" />
            <span className="text-white font-semibold text-lg">Book Your Call</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full w-8 h-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendly Widget - Takes most of the space */}
        <div className="h-full">
          <InlineWidget
            url={import.meta.env.VITE_CALENDLY_URL} 
            styles={{ 
              height: "100%",
              minHeight: "600px"
            }}
            pageSettings={{
              backgroundColor: 'ffffff',
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: '1a0f3a',
              textColor: '4a5568'
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}