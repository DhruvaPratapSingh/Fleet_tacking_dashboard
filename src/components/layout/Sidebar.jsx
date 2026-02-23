import FleetStats from "../stats/FleetStats";

const Sidebar = ({
  selectedStatus,
  setSelectedStatus,
  stats,
  vehicles,
  lastUpdatedTime,
  updateInterval,
}) => {
  const filters = [
    { label: "All", value: "all", count: stats?.total || 0 },
    { label: "Idle", value: "idle", count: stats?.idle || 0 },
    { label: "En Route", value: "en_route", count: stats?.en_route || 0 },
    { label: "Delivered", value: "delivered", count: stats?.delivered || 0 },
  ];

  return (
    <div className="bg-gray-50 border-r border-gray-200 p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">🚛 Fleet Tracking Dashboard</h1>
        <p className="text-sm text-gray-500">
          Real-time vehicle monitoring
        </p>
      </div>
      <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
        Live Updates Active
      </div>
      <div>
        <h3 className="font-semibold mb-3">Filter by Status</h3>

        <div className="grid grid-cols-2 gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`flex justify-between px-3 py-2 rounded-lg border text-sm font-medium transition ${
                selectedStatus === filter.value
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span>{filter.label}</span>
              <span className="text-gray-500">
                ({filter.count})
              </span>
            </button>
          ))}
        </div>
      </div>
      <FleetStats
        stats={stats}
        vehicles={vehicles}
        lastUpdatedTime={lastUpdatedTime}
        updateInterval={updateInterval}
      />

    </div>
  );
};

export default Sidebar;