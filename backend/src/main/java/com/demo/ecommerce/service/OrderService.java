package com.demo.ecommerce.service;

import com.demo.ecommerce.dto.OrderRequest;
import com.demo.ecommerce.model.*;
import com.demo.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    @Transactional
    public Order placeOrder(String email, OrderRequest request) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Cart cart = cartService.getCart(email);

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal total = cart.getItems().stream()
                .map(item -> item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = Order.builder()
                .user(user)
                .totalAmount(total)
                .shippingAddress(request.getShippingAddress())
                .paymentMethod(request.getPaymentMethod())
                .paymentDetails(request.getPaymentDetails())
                .status(Order.OrderStatus.PLACED)
                .paymentStatus(Order.PaymentStatus.PENDING)
                .build();

        List<OrderItem> orderItems = cart.getItems().stream()
                .map(cartItem -> OrderItem.builder()
                        .order(order)
                        .product(cartItem.getProduct())
                        .quantity(cartItem.getQuantity())
                        .price(cartItem.getProduct().getPrice())
                        .build())
                .toList();

        order.setItems(orderItems);
        Order saved = orderRepository.save(order);

        // Generate orderCode after we have the ID
        String orderCode = "ORD-" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMM"))
                + "-" + String.format("%06d", saved.getId());
        saved.setOrderCode(orderCode);
        saved = orderRepository.save(saved);

        cartService.clearCart(cart);
        return saved;
    }

    public List<Order> getUserOrders(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    @Transactional
    public Order processPayment(Long orderId) {
        Order order = getOrderById(orderId);
        order.setPaymentStatus(Order.PaymentStatus.PAID);
        order.setStatus(Order.OrderStatus.PACKED);
        return orderRepository.save(order);
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
