const DashboardCard = ({
  title,
  total,
}) => {

  return (
    <div className="dashboard-card">

      <h3>{title}</h3>

      <h1>{total}</h1>

    </div>
  );
};

export default DashboardCard;