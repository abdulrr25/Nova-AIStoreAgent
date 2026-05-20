package com.demo.ecommerce.controller;

import com.demo.ecommerce.model.Order;
import com.demo.ecommerce.model.Product;
import com.demo.ecommerce.repository.OrderRepository;
import com.demo.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Value("${ADMIN_SECRET_KEY:nova-admin-2024}")
    private String adminSecretKey;

    private boolean isAuthorized(String key) {
        return adminSecretKey.equals(key);
    }

    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders(
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        if (!isAuthorized(key))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized"));
        return ResponseEntity.ok(orderRepository.findAll());
    }

    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        if (!isAuthorized(key))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized"));
        return ResponseEntity.ok(productRepository.findAll());
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        if (!isAuthorized(key))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized"));

        List<Order> orders = orderRepository.findAll();
        double revenue = orders.stream()
                .mapToDouble(o -> o.getTotalAmount().doubleValue())
                .sum();

        return ResponseEntity.ok(Map.of(
                "totalOrders",   orders.size(),
                "totalRevenue",  revenue,
                "placed",        orders.stream().filter(o -> o.getStatus() == Order.OrderStatus.PLACED).count(),
                "packed",        orders.stream().filter(o -> o.getStatus() == Order.OrderStatus.PACKED).count(),
                "shipped",       orders.stream().filter(o -> o.getStatus() == Order.OrderStatus.SHIPPED).count(),
                "delivered",     orders.stream().filter(o -> o.getStatus() == Order.OrderStatus.DELIVERED).count(),
                "cancelled",     orders.stream().filter(o -> o.getStatus() == Order.OrderStatus.CANCELLED).count(),
                "totalProducts", productRepository.count()
        ));
    }
}
