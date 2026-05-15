package com.demo.ecommerce.service;

import com.demo.ecommerce.model.*;
import com.demo.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private final WishlistRepository wishlistRepository;
    private final WishlistItemRepository wishlistItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Wishlist getWishlist(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return wishlistRepository.findByUserId(user.getId())
                .orElseGet(() -> wishlistRepository.save(Wishlist.builder().user(user).build()));
    }

    public Wishlist addToWishlist(String email, Long productId) {
        Wishlist wishlist = getWishlist(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (!wishlistItemRepository.existsByWishlistIdAndProductId(wishlist.getId(), productId)) {
            wishlistItemRepository.save(WishlistItem.builder().wishlist(wishlist).product(product).build());
        }
        return getWishlist(email);
    }

    public Wishlist removeFromWishlist(String email, Long productId) {
        Wishlist wishlist = getWishlist(email);
        wishlistItemRepository.findByWishlistIdAndProductId(wishlist.getId(), productId)
                .ifPresent(wishlistItemRepository::delete);
        return getWishlist(email);
    }

    public boolean isInWishlist(String email, Long productId) {
        Wishlist wishlist = getWishlist(email);
        return wishlistItemRepository.existsByWishlistIdAndProductId(wishlist.getId(), productId);
    }
}
