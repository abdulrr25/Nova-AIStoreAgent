package com.demo.ecommerce.controller;

import com.demo.ecommerce.config.DataSeeder;
import com.demo.ecommerce.model.Order;
import com.demo.ecommerce.model.Product;
import com.demo.ecommerce.repository.CartItemRepository;
import com.demo.ecommerce.repository.CartRepository;
import com.demo.ecommerce.repository.OrderRepository;
import com.demo.ecommerce.repository.ProductRepository;
import com.demo.ecommerce.repository.WishlistItemRepository;
import com.demo.ecommerce.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final WishlistRepository wishlistRepository;
    private final DataSeeder dataSeeder;

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

    /**
     * One-time migration: assigns sequential local image paths and stock=10 to existing products.
     */
    @PostMapping("/fix-products")
    public ResponseEntity<?> fixProducts(
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        if (!isAuthorized(key))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized"));

        List<Product> products = new ArrayList<>(productRepository.findAll());
        products.sort((a, b) -> Long.compare(a.getId(), b.getId()));

        for (int i = 0; i < products.size(); i++) {
            Product product = products.get(i);
            product.setImageUrl("/products/" + (i + 1) + ".jpg");
            product.setStock(10);
        }
        productRepository.saveAll(products);

        return ResponseEntity.ok(Map.of(
                "message", "Updated " + products.size() + " products with local images and stock=10"
        ));
    }

    /**
     * Wipes all data (orders, carts, wishlists, products, categories)
     * and re-seeds with the latest product catalogue from DataSeeder.
     * Use once after deploying a new product set.
     */
    @PostMapping("/reseed")
    public ResponseEntity<?> reseed(
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        if (!isAuthorized(key))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized"));

        // Clear FK-dependent tables first
        cartItemRepository.deleteAll();
        cartRepository.deleteAll();
        wishlistItemRepository.deleteAll();
        wishlistRepository.deleteAll();
        orderRepository.deleteAll();   // cascades to order_items

        // Re-seed products and categories
        dataSeeder.seedAll();

        return ResponseEntity.ok(Map.of(
                "message", "Re-seeded " + productRepository.count() + " products across 5 categories"
        ));
    }
}
