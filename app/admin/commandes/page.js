"use client";

import { useEffect, useMemo, useState } from "react";

import OrdersHeader from "@/components/admin/commandes/OrdersHeader";
import OrdersToolbar from "@/components/admin/commandes/OrdersToolbar";
import OrdersStatusFilters from "@/components/admin/commandes/OrdersStatusFilters";
import OrdersList from "@/components/admin/commandes/OrdersList";
import OrderDetailsModal from "@/components/admin/commandes/OrderDetailsModal";
import DeleteOrderModal from "@/components/admin/commandes/DeleteOrderModal";
import toast from "react-hot-toast";

import {
  normalizeOrders,
  filterOrders,
  getCountByStatus,
} from "@/lib/admin/commandes/ordersUtils";

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [exitingOrderId, setExitingOrderId] = useState(null);
  

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setIsLoading(true);

        const token = sessionStorage.getItem("token");

const res = await fetch("/backend/admin/orders", {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
  cache: "no-store",
});

        const data = await res.json();

        if (!res.ok) {
          console.error("Failed to load orders:", data);
          setOrders([]);
          return;
        }

        const safeOrders = Array.isArray(data) ? data : data.orders || [];
const normalized = normalizeOrders(safeOrders);

const activeOrders = normalized.filter(
  (order) => !Boolean(order.isArchived)
);

setOrders(activeOrders);
      } catch (error) {
        console.error("Load orders error:", error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return filterOrders(orders, selectedStatus, selectedMode, searchTerm);
  }, [orders, selectedStatus, selectedMode, searchTerm]);

 const handleUpdateStatus = async (orderId, newStatus) => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`/backend/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const text = await res.text();

    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { message: text || "Invalid server response" };
    }

    if (!res.ok) {
      console.error("Update status error:", {
        status: res.status,
        data,
        raw: text,
        sentStatus: newStatus,
      });

      toast.error(
        data.message || text || `Erreur lors de la mise à jour du statut (${res.status})`
      );
      return;
    }

    const updatedOrder = data?.order;
    const isArchived = Boolean(updatedOrder?.is_archived);

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: updatedOrder?.status || newStatus,
              isArchived,
              completedAt: updatedOrder?.completed_at || null,
            }
          : order
      )
    );

    if (selectedOrder?.id === orderId) {
      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              status: updatedOrder?.status || newStatus,
              isArchived,
              completedAt: updatedOrder?.completed_at || null,
            }
          : null
      );
    }

    toast.success("Statut mis à jour avec succès");

    // ✅ إذا ولات historique: animation خفيفة وبعدها تتنحى
    if (isArchived) {
      setExitingOrderId(orderId);

      setTimeout(() => {
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
        setSelectedOrder((prev) => (prev?.id === orderId ? null : prev));
        setExitingOrderId(null);
      }, 650);
    }
  } catch (error) {
    console.error("Update status error:", error);
    toast.error("Server error");
  }
};

 const handleDeleteOrder = async (orderId) => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`/backend/admin/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();

    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Invalid JSON:", text);
    }

    if (!res.ok) {
      console.error("Delete order error:", data);

      if (res.status === 404) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(null);
        }
        setOrderToDelete(null);

        toast("Commande déjà supprimée", {
          icon: "⚠️",
        });
        return;
      }

      alert(data.message || text || "Erreur lors de la suppression");
      return;
    }

    setOrders((prev) => prev.filter((o) => o.id !== orderId));

    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }

    setOrderToDelete(null);

    toast("🗑️ Commande supprimée avec succès", {
  icon: "✅",
});
  } catch (error) {
    console.error("Delete error:", error);
    alert("Server error");
  }
};

  const handleGetCountByStatus = (status) => {
    return getCountByStatus(orders, status);
  };

  return (
    <>
      <div>
        <OrdersHeader />

        <OrdersToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          isLoading={isLoading}
        />

        <OrdersStatusFilters
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          getCountByStatus={handleGetCountByStatus}
          isLoading={isLoading}
        />

        <OrdersList
          orders={filteredOrders}
          isLoading={isLoading}
          onView={setSelectedOrder}
          onDelete={setOrderToDelete}
          onUpdateStatus={handleUpdateStatus}
          exitingOrderId={exitingOrderId}
        />
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={handleUpdateStatus}
      />

      <DeleteOrderModal
        order={orderToDelete}
        onClose={() => setOrderToDelete(null)}
        onConfirm={handleDeleteOrder}
      />
    </>
  );
}