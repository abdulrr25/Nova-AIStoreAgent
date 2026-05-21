import os
import requests
from google.adk.agents import Agent
from dotenv import load_dotenv

load_dotenv()

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8081/api")
ADMIN_KEY   = os.getenv("ADMIN_SECRET_KEY", "nova-admin-2024")
HEADERS     = {"X-Admin-Key": ADMIN_KEY}


# ── Tools ──────────────────────────────────────────────────────────────────

def get_store_stats() -> dict:
    """Get overall store statistics: total orders, revenue, order status breakdown, total products."""
    try:
        res = requests.get(f"{BACKEND_URL}/admin/stats", headers=HEADERS, timeout=10)
        return {"status": "success", "stats": res.json()}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_all_orders() -> dict:
    """Get all orders placed in the NOVA store with customer name, items, total, and status."""
    try:
        res = requests.get(f"{BACKEND_URL}/admin/orders", headers=HEADERS, timeout=10)
        orders = res.json()
        summary = [
            {
                "id":            o.get("id"),
                "orderCode":     o.get("orderCode"),
                "customer":      o.get("user", {}).get("name", "Unknown"),
                "email":         o.get("user", {}).get("email", ""),
                "status":        o.get("status"),
                "paymentStatus": o.get("paymentStatus"),
                "paymentMethod": o.get("paymentMethod"),
                "total":         o.get("totalAmount"),
                "items":         ", ".join(
                                     f"{i['product']['name']} x{i['quantity']}"
                                     for i in (o.get("items") or [])
                                     if i.get("product")
                                 ),
                "date":          o.get("createdAt"),
                "address":       o.get("shippingAddress"),
            }
            for o in orders
        ]
        return {"status": "success", "total": len(summary), "orders": summary}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_order_by_code(order_code: str) -> dict:
    """Find a specific order by its order code (e.g. ORD-202505-000001)."""
    try:
        res = requests.get(f"{BACKEND_URL}/admin/orders", headers=HEADERS, timeout=10)
        orders = res.json()
        match = next((o for o in orders if o.get("orderCode") == order_code), None)
        if not match:
            return {"status": "error", "message": f"No order found with code {order_code}"}
        return {
            "status":        "success",
            "orderCode":     match.get("orderCode"),
            "customer":      match.get("user", {}).get("name"),
            "email":         match.get("user", {}).get("email"),
            "orderStatus":   match.get("status"),
            "paymentStatus": match.get("paymentStatus"),
            "paymentMethod": match.get("paymentMethod"),
            "total":         match.get("totalAmount"),
            "items":         [
                                 f"{i['product']['name']} x{i['quantity']} @ ₹{i['price']}"
                                 for i in (match.get("items") or [])
                                 if i.get("product")
                             ],
            "date":          match.get("createdAt"),
            "address":       match.get("shippingAddress"),
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_orders_by_customer(name: str) -> dict:
    """Find all orders placed by a customer — search by customer name or email."""
    try:
        res = requests.get(f"{BACKEND_URL}/admin/orders", headers=HEADERS, timeout=10)
        orders = res.json()
        name_lower = name.lower()
        matched = [
            o for o in orders
            if name_lower in (o.get("user", {}).get("name") or "").lower()
            or name_lower in (o.get("user", {}).get("email") or "").lower()
        ]
        if not matched:
            return {"status": "error", "message": f"No orders found for customer '{name}'"}
        summary = [
            {
                "orderCode":     o.get("orderCode"),
                "status":        o.get("status"),
                "paymentMethod": o.get("paymentMethod"),
                "total":         o.get("totalAmount"),
                "items":         ", ".join(
                                     f"{i['product']['name']} x{i['quantity']}"
                                     for i in (o.get("items") or [])
                                     if i.get("product")
                                 ),
                "date":          o.get("createdAt"),
            }
            for o in matched
        ]
        customer = matched[0].get("user", {})
        return {
            "status":   "success",
            "customer": customer.get("name"),
            "email":    customer.get("email"),
            "total_orders": len(summary),
            "orders":   summary,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_orders_by_status(order_status: str) -> dict:
    """Get all orders filtered by status. Valid statuses: PLACED, PACKED, SHIPPED, DELIVERED, CANCELLED."""
    try:
        res = requests.get(f"{BACKEND_URL}/admin/orders", headers=HEADERS, timeout=10)
        orders = res.json()
        matched = [o for o in orders if (o.get("status") or "").upper() == order_status.upper()]
        summary = [
            {
                "orderCode": o.get("orderCode"),
                "customer":  o.get("user", {}).get("name"),
                "total":     o.get("totalAmount"),
                "date":      o.get("createdAt"),
            }
            for o in matched
        ]
        return {"status": "success", "filter": order_status.upper(), "count": len(summary), "orders": summary}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_all_products() -> dict:
    """Get all products in the NOVA store with name, price, stock, and category."""
    try:
        res = requests.get(f"{BACKEND_URL}/admin/products", headers=HEADERS, timeout=10)
        products = res.json()
        summary = [
            {
                "id":       p.get("id"),
                "name":     p.get("name"),
                "price":    p.get("price"),
                "stock":    p.get("stock"),
                "category": p.get("category", {}).get("name") if p.get("category") else None,
            }
            for p in products
        ]
        return {"status": "success", "total": len(summary), "products": summary}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def search_products(query: str) -> dict:
    """Search for products by name or category keyword."""
    try:
        res = requests.get(f"{BACKEND_URL}/products/search?q={query}", timeout=10)
        products = res.json()
        summary = [
            {
                "id":       p.get("id"),
                "name":     p.get("name"),
                "price":    p.get("price"),
                "stock":    p.get("stock"),
                "category": p.get("category", {}).get("name") if p.get("category") else None,
            }
            for p in products
        ]
        return {"status": "success", "query": query, "results": len(summary), "products": summary}
    except Exception as e:
        return {"status": "error", "message": str(e)}


def get_low_stock_products(threshold: int = 10) -> dict:
    """Get all products with stock below a given threshold (default: 10 units)."""
    try:
        res = requests.get(f"{BACKEND_URL}/admin/products", headers=HEADERS, timeout=10)
        products = res.json()
        low = [
            {"name": p.get("name"), "stock": p.get("stock"), "price": p.get("price")}
            for p in products
            if (p.get("stock") or 0) <= threshold
        ]
        return {"status": "success", "threshold": threshold, "count": len(low), "products": low}
    except Exception as e:
        return {"status": "error", "message": str(e)}


# ── Agent — uses Gemini 2.0 Flash (native Google ADK, perfect tool calling) ──

root_agent = Agent(
    name="nova_admin_agent",
    model="gemini-2.0-flash",
    description="AI admin assistant for NOVA fashion e-commerce store.",
    instruction="""
You are an intelligent admin assistant for NOVA, a fashion e-commerce store.
You have real-time access to the store's orders, products, customers, and revenue data.

Available tools:
- get_store_stats       → overall revenue, order counts, product count
- get_all_orders        → full list of all orders
- get_order_by_code     → look up a specific order by its ORD-XXXXXX code
- get_orders_by_customer→ find all orders by a customer name or email
- get_orders_by_status  → filter orders by PLACED / PACKED / SHIPPED / DELIVERED / CANCELLED
- get_all_products      → list all products with price & stock
- search_products       → search products by keyword
- get_low_stock_products→ find products running low on inventory

Guidelines:
- Always use the right tool for the question — don't guess from memory.
- Format currency as ₹ (Indian Rupees).
- Show dates in a readable format.
- Be concise but complete — include order codes, customer names, and totals in responses.
- If a customer or order is not found, say so clearly.
    """,
    tools=[
        get_store_stats,
        get_all_orders,
        get_order_by_code,
        get_orders_by_customer,
        get_orders_by_status,
        get_all_products,
        search_products,
        get_low_stock_products,
    ],
)
