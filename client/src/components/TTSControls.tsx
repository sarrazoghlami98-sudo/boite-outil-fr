import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ttsService, TTSSpeed } from '@/lib/tts';

interface TTSControlsProps {
  text: string;
  onSpeakStart?: () => void;
  onSpeakEnd?: () => void;
}

export interface TTSControlsRef {
  handleSpaceKey: () => void;
}

const TTSControls = forwardRef<TTSControlsRef, TTSControlsProps>(({ text, onSpeakStart, onSpeakEnd }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [speed, setSpeed] = useState<TTSSpeed>(1);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    return () => {
      ttsService.stop();
      setIsHighlighted(false);
    };
  }, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useImperativeHandle(ref, () => ({
    handleSpaceKey: handlePlayPause
  }));

  const handlePlayPause = () => {
    // Prevent double-tap issues by checking if already playing
    if (isPlayingRef.current) {
      ttsService.stop();
      setIsPlaying(false);
      setIsHighlighted(false);
      onSpeakEnd?.();
      return;
    }

    // Guard against rapid clicks
    if (ttsService.isSpeaking()) {
      ttsService.stop();
    }

    ttsService.setSpeed(speed);
    setIsPlaying(true);
    
    ttsService.speak(text, {
      onStart: () => {
        setIsHighlighted(true);
        onSpeakStart?.();
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsHighlighted(false);
        onSpeakEnd?.();
      }
    });
  };

  const handleSpeedChange = (newSpeed: TTSSpeed) => {
    setSpeed(newSpeed);
    ttsService.setSpeed(newSpeed);
    if (isPlaying) {
      ttsService.stop();
      setIsHighlighted(true);
      setIsPlaying(true);
      ttsService.speak(text, {
        onStart: () => {
          setIsHighlighted(true);
          onSpeakStart?.();
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsHighlighted(false);
          onSpeakEnd?.();
        }
      });
    }
  };

  if (!ttsService.isSupported()) {
    return (
      <div className="text-sm text-muted-foreground text-center py-2" role="status">
        La synthèse vocale n'est pas disponible sur cet appareil.
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center justify-center gap-4 p-4 bg-card rounded-lg border border-card-border transition-colors ${
        isHighlighted ? 'ring-2 ring-primary ring-offset-2' : ''
      }`}
      role="region"
      aria-label="Contrôles de lecture audio"
    >
      <Button
        size="icon"
        variant={isPlaying ? "default" : "outline"}
        onClick={handlePlayPause}
        data-testid="button-tts-play-pause"
        aria-label={isPlaying ? "Arrêter la lecture audio" : "Lire le texte à voix haute"}
        aria-pressed={isPlaying}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </Button>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground" id="speed-label">Vitesse:</span>
        <div className="flex gap-2" role="group" aria-labelledby="speed-label">
          {([0.8, 1, 1.2] as TTSSpeed[]).map((s) => (
            <Badge
              key={s}
              variant={speed === s ? "default" : "outline"}
              className="cursor-pointer toggle-elevate"
              onClick={() => handleSpeedChange(s)}
              data-testid={`button-speed-${s}`}
              role="button"
              tabIndex={0}
              aria-label={`Vitesse de lecture ${s} fois`}
              aria-pressed={speed === s}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleSpeedChange(s);
                }
              }}
            >
              {s}×
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
});

TTSControls.displayName = 'TTSControls';

export default TTSControls;
