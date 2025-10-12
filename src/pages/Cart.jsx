// src/pages/Cart.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { Separator } from '@/components/ui/seperator';
import OrderSuccessAnimation from '@/components/orderSuccessAnimation';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const handleCheckout = () => {
    // trigger the success animation
    setShowSuccessAnimation(true);
  };

  const totalPrice = getTotalPrice();
  const deliveryCharge = totalPrice > 999 ? 0 : 99;
  const finalTotal = totalPrice + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container-custom py-20">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link to="/products">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showSuccessAnimation && (
        <OrderSuccessAnimation
          onComplete={() => {
            // clear the cart after animation completes and hide animation
            clearCart();
            setShowSuccessAnimation(false);
            // Optionally navigate to /orders here if you have an orders page:
            // navigate('/orders');
          }}
        />
      )}
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-muted border-b border-border">
          <div className="container-custom py-6">
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="p-4"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <Link to={`/products/${item.id}`}>
                      <div className="w-24 h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-full w-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <Link to={`/products/${item.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.brand}
                          </p>
                          {item.selectedSize && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Size: <span className="font-medium">{item.selectedSize}</span>
                            </p>
                          )}
                          {item.selectedColor && (
                            <p className="text-sm text-muted-foreground">
                              Color: <span className="font-medium">{item.selectedColor}</span>
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold">₹{item.price}</p>
                          {item.originalPrice && (
                            <p className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Charge</span>
                    <span className="font-medium">
                      {deliveryCharge === 0 ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        `₹${deliveryCharge}`
                      )}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">₹{finalTotal.toFixed(2)}</span>
                </div>

                {deliveryCharge > 0 && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Add items worth ₹{(1000 - totalPrice).toFixed(2)} more for FREE delivery
                  </p>
                )}

                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>

                <Link to="/products">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
