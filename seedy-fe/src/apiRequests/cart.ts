import http from "@/lib/https";

const cartApiRequest = {
  getDetail: () => http.get("api/Cart/details"),

  addToCart: async (productId: string, quantity: number, token: string) => {
    return http.post(
      "api/Cart/add",
      { ProductId: productId, Quantity: quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: async (
    cartItemId: string,
    quantity: number,
    token: string
  ) => {
    return http.put(
      "api/Cart/update",
      { CartItemId: cartItemId, Quantity: quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeCartItem: async (cartItemId: string, token: string) => {
    return http.delete(`api/Cart/remove/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export default cartApiRequest;
