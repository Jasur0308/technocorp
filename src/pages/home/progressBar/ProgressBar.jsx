import { BsCheckLg } from "react-icons/bs";

const stats = [
    { label: "Clicks", percent: 81, color: "bg-blue-500", number: "567" },
    { label: "Unique Clicks", percent: 72, color: "bg-green-500", number: "507" },
    { label: "Impressions", percent: 53, color: "bg-yellow-400", number: "457" },
    { label: "Online Users", percent: 3, color: "bg-red-400", number: "8" },
];

const StatsProgressBars = () => {
    return (
        <div className="pb-8 bg-white rounded shadow w-full space-y-4 border-[0.5px] border-gray-300">
            <div className="flex items-center border-b-[1px] border-gray-300 p-2 gap-2 bg-gray-100">
                <div className="flex items-center text-[18px] text-gray-700">
                    <BsCheckLg/>
                </div>
                <div className="flex items-center text-[14px] font-semibold text-gray-700">
                    <h2>Site Analytics</h2>
                </div>
            </div>
            {stats.map(({ label, percent, color, number }, i) => (
                <div key={i} className="px-6 space-y-2">
                    <div className="flex justify-between text-sm text-gray-700 gap-1">
                        <span className="font-medium">{percent}% {label}</span>
                        <span>{number}</span>
                    </div>
                    <div className="w-full h-6 bg-gray-100 overflow-hidden shadow-inner">
                        <div
                            className={`h-full ${color} transition-all duration-300`}
                            style={{ width: `${percent}%` }}
                        ></div>
                    </div>
                    {i !== stats.length - 1 && (
                        <div className="border-b border-gray-200 pt-2" />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StatsProgressBars;