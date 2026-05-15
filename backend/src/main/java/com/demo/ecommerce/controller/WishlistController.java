package com.demo.ecommerce.controller;

import com.demo.ecommerce.model.Wishlist;
import com.demo.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<Wishlist> getWishlist(@AuthenticationPrincipal UserDetails ud) {
        return ResponseEntity.ok(wishlistService.getWishlist(ud.getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<Wishlist> add(@AuthenticationPrincipal UserDetails ud,
                                        @RequestBody Map<String, Long> body) {
        return ResponseEntity.ok(wishlistService.addToWishlist(ud.getUsername(), body.get("productId")));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Wishlist> remove(@AuthenticationPrincipal UserDetails ud,
                                           @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.removeFromWishlist(ud.getUsername(), productId));
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<Map<String, Boolean>> check(@AuthenticationPrincipal UserDetails ud,
                                                       @PathVariable Long productId) {
        return ResponseEntity.ok(Map.of("inWishlist", wishlistService.isInWishlist(ud.getUsername(), productId)));
    }
}
