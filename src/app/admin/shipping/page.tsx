"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/super-admin/ui/PageHeader";
import { SearchToolbar } from "@/components/super-admin/ui/SearchToolbar";
import { DataTable, Column } from "@/components/super-admin/ui/DataTable";
import { StatusBadge } from "@/components/super-admin/ui/StatusBadge";
import { Pagination } from "@/components/super-admin/ui/Pagination";
import { Truck, MapPin, PackageCheck } from "lucide-react";

const mockShipments = [
  {
    id: "SHIP-7710",
    orderId: "ORD-98422",
    courier: "Steadfast Courier",
    trackingNo: "STDF-998811",
    customer: "Alex Rivera",
    city: "Chittagong",
    status: "Shipped",
    dispatchDate: "29 Aug 2026",
  },
  {
    id: "SHIP-7711",
    orderId: "ORD-98424",
    courier: "Pathao Parcel",
    trackingNo: "PTH-441122",
    customer: "Tariq Mahmood",
    city: "Dhaka",
    status: "Delivered",
    dispatchDate: "27 Aug 2026",
  },
  {
    id: "SHIP-7712",
    orderId: "ORD-98421",
    courier: "RedX Delivery",
    trackingNo: "REDX-112233",
    customer: "Naiem Hasan",
    city: "Dhaka",
    status: "Processing",
    dispatchDate: "Pending Dispatch",
  },
];

export default function AdminShippingPage() {
  const [shipments, setShipments] = useState(mockShipments);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const filtered = shipments.filter(
    (s) =>
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.orderId.toLowerCase().includes(search.toLowerCase()) ||
      s.customer.toLowerCase().includes(search.toLowerCase()) ||
      s.trackingNo.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setShipments((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  const columns: Column<any>[] = [
    {
      header: "Shipment ID",
      cell: (s) => (
        <div>
          <p className="font-bold text-gray-900">{s.id}</p>
          <p className="text-[10px] text-gray-400">Order: {s.orderId}</p>
        </div>
      ),
    },
    {
      header: "Courier & Tracking",
      cell: (s) => (
        <div>
          <p className="font-bold text-gray-800">{s.courier}</p>
          <p className="text-[10px] text-[#B37068] font-mono font-bold">{s.trackingNo}</p>
        </div>
      ),
    },
    {
      header: "Customer & City",
      cell: (s) => (
        <div>
          <p className="font-bold text-gray-800">{s.customer}</p>
          <p className="text-[10px] text-gray-400 flex items-center gap-0.5">
            <MapPin size={10} /> {s.city}
          </p>
        </div>
      ),
    },
    {
      header: "Delivery Status",
      cell: (s) => <StatusBadge status={s.status} type="order" />,
    },
    {
      header: "Update Status",
      className: "text-right",
      cell: (s) => (
        <select
          value={s.status}
          onChange={(e) => handleUpdateStatus(s.id, e.target.value)}
          className="bg-gray-50 border border-gray-200 text-gray-700 text-[11px] font-bold rounded-lg px-2 py-1 outline-none focus:border-[#B37068] cursor-pointer"
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      ),
    },
  ];

  return (
    <div className="space-y-6 w-full pb-12">
      <PageHeader
        title="Shipping & Logistics Dispatch"
        description="Track parcel shipments, courier tracking numbers, and delivery status updates"
        breadcrumbs={[{ label: "Shipping" }]}
      />

      <SearchToolbar
        searchQuery={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search tracking number, order ID, or customer..."
      />

      <DataTable
        columns={columns}
        data={paginated}
        keyExtractor={(s) => s.id}
        emptyMessage="No shipments found matching criteria"
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filtered.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
