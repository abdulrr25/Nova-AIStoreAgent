package com.demo.ecommerce.service;

import com.demo.ecommerce.dto.CartItemRequest;
import com.demo.ecommerce.model.*;
import com.demo.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart getCart(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> cartRepository.save(Cart.builder().user(user).build()));
    }

    public Cart addToCart(String email, CartItemRequest request) {
        Cart cart = getCart(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        cartItemRepository.findByCartIdAndProductId(cart.getId(), product.getId())
                .ifPresentOrElse(
                        item -> {
                            item.setQuantity(item.getQuantity() + request.getQuantity());
                            cartItemRepository.save(item);
                        },
                        () -> cartItemRepository.save(CartItem.builder()
                                .cart(cart)
                                .product(product)
                                .quantity(request.getQuantity())
                                .build())
                );
        return getCart(email);
    }

    public Cart removeFromCart(String email, Long itemId) {
        cartItemRepository.deleteById(itemId);
        return getCart(email);
    }

    public Cart updateCartItem(String email, Long itemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }
        return getCart(email);
    }

    public void clearCart(Cart cart) {
        cart.getItems().clear();
        cartRepository.save(cart);
    }
}
