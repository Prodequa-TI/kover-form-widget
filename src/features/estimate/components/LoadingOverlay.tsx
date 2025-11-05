import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
    message?: string;
}

export default function LoadingOverlay({
    message = 'Generando tu cotización...',
}: LoadingOverlayProps) {
    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'>
            <div className='bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 animate-in fade-in-50 zoom-in-95 duration-300'>
                <div className='flex flex-col items-center gap-6'>
                    <div className='relative'>
                        <Loader2
                            className='size-16 text-indigo-500 animate-spin'
                            strokeWidth={2.5}
                        />
                    </div>
                    <div className='text-center space-y-2'>
                        <h2 className='text-2xl font-bold text-slate-900'>
                            {message}
                        </h2>
                        <p className='text-slate-500 text-sm'>
                            Por favor espera un momento
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <div className='w-3 h-3 bg-widget-primary rounded-full animate-bounce animate-delay-0'></div>
                        <div className='w-3 h-3 bg-widget-primary rounded-full animate-bounce animate-delay-150'></div>
                        <div className='w-3 h-3 bg-widget-primary rounded-full animate-bounce animate-delay-300'></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
