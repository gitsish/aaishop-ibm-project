import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWishlist } from "@/hooks/useWishlist";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
        <p className="text-muted-foreground mb-4">
          Save items to your wishlist and find them here later.
        </p>
        <Link to="/products">
          <Button>Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="p-4 relative group">
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-muted-foreground text-sm">{item.brand}</p>
              <p className="font-bold mt-2">₹{item.price}</p>

              <div className="mt-4 flex gap-2">
                <Link to={`/products/${item.id}`}>
                  <Button size="sm" variant="default">View</Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
