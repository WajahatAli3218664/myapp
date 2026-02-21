"use client";
import { useEffect, createElement } from "react";

export default function ModelViewer({ src, poster }: { src: string; poster?: string }) {
    useEffect(() => {
        import("@google/model-viewer");
    }, []);

    return (
        <div className="w-full h-full min-h-[300px] relative rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing">
            {createElement('model-viewer', {
                src,
                poster,
                'camera-controls': true,
                'auto-rotate': true,
                'rotation-per-second': '30deg',
                'shadow-intensity': '1',
                'environment-image': 'neutral',
                exposure: '1',
                style: { width: '100%', height: '100%', backgroundColor: 'transparent' },
                'touch-action': 'pan-y',
                'disable-zoom': true,
            },
                createElement('div', {
                    slot: 'poster',
                    className: 'absolute inset-0 flex items-center justify-center bg-stone-900/10'
                },
                    createElement('div', {
                        className: 'w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin'
                    })
                )
            )}
        </div>
    );
}
