function Check({ checked }: { checked: boolean }) {
    return (
        <div
            className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-110 active:scale-90 ${
                checked ? "bg-blue-500 border-cyan-500 shadow-md" : "border-zinc-500 hover:border-blue-500/50" 
            }`}
        >
            {checked && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-check w-4 h-4 text-white animate-[bounce_0.3s] transition-all duration-300 ease-out"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
        </div>
    );
}

export default Check;