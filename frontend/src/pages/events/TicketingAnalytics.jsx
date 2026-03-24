import React from "react";
import { FaTicketAlt, FaDollarSign, FaChartLine, FaArrowLeft } from "react-icons/fa";
import "./TicketingAnalytics.css";
import { useNavigate } from "react-router-dom";

const StatCard = ({ title, value, subtitle, extra, icon }) => (
  <div className="card stat-card">
    <div className="card-header">
      <span className="icon">{icon}</span>
      <span>{title}</span>
      {extra && <span className="badge">{extra}</span>}
    </div>
    <h2>{value}</h2>
    <p>{subtitle}</p>
  </div>
);

const CategoryCard = ({
  title,
  price,
  capacity,
  sold,
  available,
  percent,
  revenue,
  remaining,
  status,
}) => (
  <div className="card category-card">
    <div className="category-header">
      <h3>{title}</h3>
      <span className="price">${price}</span>
    </div>

    {status && <span className="status">{status}</span>}

    <div className="category-body">
      <div>
        <p>Capacity: {capacity}</p>
        <p>Sold: {sold}</p>
        <p>Available: {available}</p>
      </div>

      <div className="circle">
        <span>{percent}%</span>
      </div>
    </div>

    <div className="category-footer">
      <p>Revenue: ${revenue}</p>
      <p>Remaining: ${remaining}</p>
    </div>
  </div>
);

const TicketFeedItem = ({ name, detail, amount, time }) => (
  <div className="feed-item">
    <div>
      <strong>{name}</strong>
      <p>{detail}</p>
    </div>
    <div className="amount">
      <span>+${amount}</span>
      <p>{time}</p>
    </div>
  </div>
);

export default function TicketingAnalytics() {
  const navigate = useNavigate();
  return (
 <div className="container">
      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/event-profile")} // ✅ use navigate here
      >
        <FaArrowLeft /> Back
      </button>

      <h1>Ticketing Analytics</h1>

      {/* Top Stats */}
      <div className="grid-3">
        <StatCard
          title="Total Tickets Sold"
          value="1,248 / 1,500"
          subtitle="84% Capacity"
          icon={<FaTicketAlt />}
        />
        <StatCard
          title="Total Revenue Earned"
          value="$42,850.00"
          subtitle="+12% from yesterday"
          icon={<FaDollarSign />}
        />
        <StatCard
          title="Revenue Potential"
          value="$11,200.00"
          subtitle="Projected remaining"
          icon={<FaChartLine />}
        />
      </div>

      {/* Categories */}
      <h2>Category Breakdown</h2>
      <div className="grid-2">
        <CategoryCard
          title="VIP All-Access"
          price="150"
          capacity="200"
          sold="184"
          available="16"
          percent="92"
          revenue="27,600"
          remaining="2,400"
        />

        <CategoryCard
          title="Early Bird"
          price="45"
          capacity="300"
          sold="300"
          available="0"
          percent="100"
          revenue="13,500"
          remaining="0"
          status="SOLD OUT"
        />

        <CategoryCard
          title="General Admission"
          price="60"
          capacity="500"
          sold="412"
          available="88"
          percent="82"
          revenue="24,720"
          remaining="5,280"
        />

        <CategoryCard
          title="Student Discount"
          price="25"
          capacity="500"
          sold="352"
          available="148"
          percent="70"
          revenue="8,800"
          remaining="3,700"
        />
      </div>

      {/* Feed */}
      <h2>Live Ticket Feed</h2>
      <div className="card feed">
        <TicketFeedItem
          name="Sarah Jenkins"
          detail="VIP All-Access x2"
          amount="300"
          time="Just now"
        />
        <TicketFeedItem
          name="Michael Chen"
          detail="General Admission x4"
          amount="240"
          time="12 min ago"
        />
        <TicketFeedItem
          name="Alex Rivera"
          detail="Student Discount x1"
          amount="25"
          time="45 min ago"
        />
        <button className="check-all-btn">Check All Tickets</button>
      </div>
    </div>
  );
}