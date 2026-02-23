import { useEffect, useMemo, useState } from "react";

const FleetStats = ({
  stats,
  vehicles = [],         
  lastUpdatedTime = Date.now(),
  updateInterval = 180,   
}) => {
  const [secondsAgo, setSecondsAgo] = useState(0);

  const movingCount = useMemo(() => {
    return vehicles?.filter((v) => v.speed > 0).length || 0;
  }, [vehicles]);
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - lastUpdatedTime) / 1000);
      setSecondsAgo(diff);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdatedTime]);

  const remaining = Math.max(updateInterval - secondsAgo, 0);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };
  if (!stats) return null;

  return (
    <div>
      <h3 className="font-semibold mb-3">Fleet Statistics</h3>
      <div className="grid grid-cols-2 gap-4">

        <StatCard title="Total Fleet" value={stats.total} />
        <StatCard title="Avg Speed" value={`${stats.average_speed} mph`} />
        <StatCard title="Moving" value={movingCount} />
        <StatCard
          title="Last Update"
          value={new Date(lastUpdatedTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />

      </div>
      <div className="mt-4 text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded-lg flex items-center gap-2">
        ⏱ Updated {secondsAgo}s ago • Next update in {formatTime(remaining)}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white border rounded-xl p-4 shadow-sm">
    <p className="text-xs text-gray-500 mb-1">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default FleetStats;