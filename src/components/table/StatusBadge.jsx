const StatusBadge = ({ status }) => {
  const styles = {
    idle: "bg-gray-200 text-gray-700",
    en_route: "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};

export default StatusBadge;