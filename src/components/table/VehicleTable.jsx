
import StatusBadge from "./StatusBadge";

const VehicleTable = ({ vehicles = [], setSelectedVehicle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
      <table className="w-full text-sm min-w-[1100px]">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Vehicle</th>
            <th className="p-3 text-left">Driver</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Speed</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">ETA</th>
            <th className="p-3 text-left">Last Update</th>
            <th className="p-3 text-left">Location</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((v) => (
            <tr
              key={v.id}
              onClick={() => setSelectedVehicle(v)}
              className="border-b hover:bg-gray-50 cursor-pointer transition"
            >
              
              <td className="p-3 text-blue-600 font-medium">
                {v.vehicleNumber}
              </td>

             
              <td className="p-3">{v.driverName}</td>

            
              <td className="p-3">
                <StatusBadge status={v.status} />
              </td>

            
              <td className="p-3">
                <span className="bg-gray-200 px-2 py-1 rounded-full text-xs font-medium">
                  {v.speed} mph
                </span>
              </td>

             
              <td className="p-3">{v.destination}</td>

          
              <td className="p-3">
                {v.estimatedArrival ? (
                  new Date(v.estimatedArrival).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                ) : (
                  "-"
                )}
              </td>

          
              <td className="p-3">
                {new Date(v.lastUpdated).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>

              <td className="p-3 text-xs text-gray-600">
                {v.currentLocation?.lat?.toFixed(4)},{" "}
                {v.currentLocation?.lng?.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;