import { useEffect, useState } from "react";
import { getVehicles } from "../api/vehicles";
import { getStatistics } from "../api/statistics";
import Sidebar from "../components/layout/Sidebar";
import VehicleTable from "../components/table/VehicleTable";
import VehicleModal from "../components/modal/VehicleModal";

const WS_URL = "wss://case-study-26cf.onrender.com";
const UPDATE_INTERVAL_SECONDS = 180; 

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(Date.now());

  
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const vehicleData = await getVehicles(selectedStatus);
        const statsData = await getStatistics();

        setVehicles(vehicleData);
        setStats(statsData);
        setLastUpdatedTime(Date.now());
      } catch (error) {
        console.error("Initial Fetch Error:", error);
      }
    };

    fetchInitialData();
  }, [selectedStatus]);

 
  useEffect(() => {
    let socket;

    const connectWebSocket = () => {
      socket = new WebSocket(WS_URL);

      socket.onopen = () => {
        console.log("✅ WebSocket Connected");
      };

      socket.onmessage = async (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📡 WebSocket Data:", data);

          if (Array.isArray(data)) {
            setVehicles(data);
          }

          else if (data.id) {
            setVehicles((prev) =>
              prev.map((v) =>
                v.id === data.id ? { ...v, ...data } : v
              )
            );
          }

         
          const updatedStats = await getStatistics();
          setStats(updatedStats);

         
          setLastUpdatedTime(Date.now());

        } catch (error) {
          console.error("WebSocket Parse Error:", error);
        }
      };

      socket.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
      };

      socket.onclose = () => {
        console.warn("⚠️ WebSocket Disconnected. Reconnecting in 5s...");
        setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => socket?.close();
  }, []);

  return (
    <div className="grid grid-cols-[300px_1fr] h-screen">

      <Sidebar
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        stats={stats}
        vehicles={vehicles}
        lastUpdatedTime={lastUpdatedTime}
        updateInterval={UPDATE_INTERVAL_SECONDS}
      />

      <div className="p-6 overflow-auto">
        <h2 className="text-xl font-bold mb-4">
          Vehicles ({vehicles.length})
        </h2>

        <VehicleTable
          vehicles={vehicles}
          setSelectedVehicle={setSelectedVehicle}
        />

        <VehicleModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      </div>
    </div>
  );
};

export default Dashboard;