const ErrorFallback = () => {
    return (
        <div className='flex min-h-screen w-full flex-col items-center justify-center gap-3'>
            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-gray-500'>
                <p className='text-xl text-white'>!</p>
            </div>
            <p className="text-lg">
                Something went wrong
            </p>
            <button
                onClick={() => window.location.reload()}
                className='text-gray-500'
            >
                Try again
            </button>
        </div>
    );
};

export default ErrorFallback;
