import { useEffect, useState } from 'react';
import { GestureRecognizer, FilesetResolver } from '@mediapipe/tasks-vision';

export const useMediaPipeGesture = () => {
    const [recognizer, setRecognizer] = useState<GestureRecognizer | null>(null);
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        const initializeMediaPipe = async () => {
            try {
                setIsModelLoading(true);
                // Load WebAssembly logic and model
                const vision = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
                );

                const gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
                        delegate: "GPU"
                    },
                    runningMode: "VIDEO",
                    numHands: 1
                });

                if (active) {
                    setRecognizer(gestureRecognizer);
                    setIsModelLoading(false);
                }
            } catch (err) {
                if (active) {
                    setError(err instanceof Error ? err.message : 'Failed to load MediaPipe model');
                    setIsModelLoading(false);
                }
            }
        };

        initializeMediaPipe();
        return () => {
            active = false;
        };
    }, []);

    return { recognizer, isModelLoading, error };
};
