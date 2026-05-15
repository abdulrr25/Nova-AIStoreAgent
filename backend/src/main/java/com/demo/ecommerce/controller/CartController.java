package com.demo.ecommerce.controller;

import com.demo.ecommerce.dto.CartItemRequest;
import com.demo.ecommerce.model.Cart;
import com.demo.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<Cart> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cartService.getCart(userDetails.getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@AuthenticationPrincipal UserDetails userDetails,
                                          @RequestBody CartItemRequest request) {
        return ResponseEntity.ok(cartService.addToCart(userDetails.getUsername(), request));
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<Cart> removeFromCart(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeFromCart(userDetails.getUsername(), itemId));
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<Cart> updateCartItem(@AuthenticationPrincipal UserDetails userDetails,
                                               @PathVariable Long itemId,
                                               @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateCartItem(userDetails.getUsername(), itemId, quantity));
    }
}
