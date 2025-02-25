import http from "@/lib/http";

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
};

export default cartApiRequest;
