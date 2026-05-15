package com.demo.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Builder.Default
    private List<OrderItem> items = new ArrayList<>();

    @Column(nullable = false)
    private BigDecimal totalAmount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private OrderStatus status = OrderStatus.PLACED;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    private String shippingAddress;

    @Column(unique = true, length = 30)
    private String orderCode;  // e.g., "ORD-202501-000042"

    @Column(length = 50)
    private String paymentMethod;  // UPI, CARD, NET_BANKING, COD, WALLET

    @Column(length = 200)
    private String paymentDetails;  // e.g., "UPI: user@paytm" or "Card: **** 4242"

    @Column(nullable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum OrderStatus {
        PLACED, PACKED, SHIPPED, DELIVERED, CANCELLED
    }

    public enum PaymentStatus {
        PENDING, PAID, FAILED
    }
}
