package com.demo.ecommerce.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private String shippingAddress;
    private String paymentMethod;   // UPI, CARD, NET_BANKING, COD, WALLET
    private String paymentDetails;  // optional details
}
