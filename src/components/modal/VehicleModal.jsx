import React from "react";

const VehicleModal = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  const statusColor =
    vehicle.status?.toLowerCase() === "active"
      ? "bg-green-100 text-green-700"
      : vehicle.status?.toLowerCase() === "idle"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {vehicle.vehicleNumber}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {vehicle.driverName} • {vehicle.status?.toUpperCase()}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Tile label="Status">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}
            >
              {vehicle.status?.toUpperCase()}
            </span>
          </Tile>

          <Tile label="Current Speed">
            <span className="text-lg font-semibold">
              {vehicle.speed ?? 0} mph
            </span>
          </Tile>

          <Tile label="Driver">
            {vehicle.driverName}
          </Tile>

          <Tile label="Phone">
            {vehicle.driverPhone}
          </Tile>

          <Tile label="Destination">
            {vehicle.destination}
          </Tile>

          <Tile label="Location">
            <div className="bg-gray-100 p-2 rounded text-sm">
              {vehicle.currentLocation?.lat?.toFixed(6) ?? "0.000000"},
              <br />
              {vehicle.currentLocation?.lng?.toFixed(6) ?? "0.000000"}
            </div>
          </Tile>

          <Tile label="Battery Level">
            <ProgressBar
              value={vehicle.batteryLevel ?? 0}
              color="bg-red-500"
            />
          </Tile>

          <Tile label="Fuel Level">
            <ProgressBar
              value={vehicle.fuelLevel ?? 0}
              color="bg-orange-500"
            />
          </Tile>

          <Tile label="Last Updated" full>
            {vehicle.lastUpdated
              ? new Date(vehicle.lastUpdated).toLocaleString("en-GB")
              : "N/A"}
          </Tile>

        </div>
      </div>
    </div>
  );
};

const Tile = ({ label, children, full }) => (
  <div
    className={`bg-gray-50 border-l-4 border-blue-500 rounded-xl p-4 ${
      full ? "sm:col-span-2" : ""
    }`}
  >
    <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
      {label}
    </p>
    <div className="font-medium">{children}</div>
  </div>
);

const ProgressBar = ({ value, color }) => (
  <div>
    <p className="text-sm font-semibold mb-1">{value}%</p>
    <div className="w-full bg-gray-200 h-2 rounded-full">
      <div
        className={`${color} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default VehicleModal;