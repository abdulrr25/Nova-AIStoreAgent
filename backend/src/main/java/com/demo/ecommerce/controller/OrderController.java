package com.demo.ecommerce.controller;

import com.demo.ecommerce.dto.OrderRequest;
import com.demo.ecommerce.model.Order;
import com.demo.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(@AuthenticationPrincipal UserDetails userDetails,
                                            @RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.placeOrder(userDetails.getUsername(), request));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getUserOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getUserOrders(userDetails.getUsername()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<Order> processPayment(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.processPayment(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(@PathVariable Long id,
                                              @RequestParam Order.OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
