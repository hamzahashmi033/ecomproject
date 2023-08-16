import React from "react";

export default function QuickFilters() {
  const QuickFilterArray = [
    {
      id: 1,
      value: "0 Ship by today",
    },
    {
      id: 2,
      value: "2 Prime unshipped",
    },
    {
      id: 3,
      value: "0 Guaranteed Delivery unshipped",
    },
    {
      id: 4,
      value: "0 Business Customer unshipped",
    },
    {
      id: 5,
      value: "0 Verge of Late Shipments",
    },
    {
      id: 6,
      value: "0 Verge of Cancellation",
    },
    {
      id: 7,
      value: "0 Self Ship",
    },
  ];
  return (
    <div className="quick_filters">
      <ul>
        <li style={{ color: "black", fontSize: "15px" }}>Quick Filters:</li>
        {QuickFilterArray.map((filter) => {
          return (
            <li key={filter.id}>
              <b>{filter.value}</b>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
