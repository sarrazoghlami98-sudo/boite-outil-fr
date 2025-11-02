import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ttsService, TTSSpeed } from '@/lib/tts';

interface TTSControlsProps {
  text: string;
}

export interface TTSControlsRef {
  handleSpaceKey: () => void;
}

const TTSControls = forwardRef<TTSControlsRef, TTSControlsProps>(({ text }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<TTSSpeed>(1);

  useEffect(() => {
    return () => {
      ttsService.stop();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    handleSpaceKey: handlePlayPause
  }));

  const handlePlayPause = () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
    } else {
      ttsService.setSpeed(speed);
      ttsService.speak(text, () => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (newSpeed: TTSSpeed) => {
    setSpeed(newSpeed);
    ttsService.setSpeed(newSpeed);
    if (isPlaying) {
      ttsService.stop();
      ttsService.speak(text, () => setIsPlaying(false));
    }
  };

  if (!ttsService.isSupported()) {
    return (
      <div className="text-sm text-muted-foreground text-center py-2">
        La synthèse vocale n'est pas disponible sur cet appareil.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-card rounded-lg border border-card-border">
      <Button
        size="icon"
        variant={isPlaying ? "default" : "outline"}
        onClick={handlePlayPause}
        data-testid="button-tts-play-pause"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Vitesse:</span>
        {([0.8, 1, 1.2] as TTSSpeed[]).map((s) => (
          <Badge
            key={s}
            variant={speed === s ? "default" : "outline"}
            className="cursor-pointer toggle-elevate"
            onClick={() => handleSpeedChange(s)}
            data-testid={`button-speed-${s}`}
          >
            {s}×
          </Badge>
        ))}
      </div>
    </div>
  );
});

TTSControls.displayName = 'TTSControls';

export default TTSControls;
