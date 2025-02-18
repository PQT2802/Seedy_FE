import http from "@/lib/http";

import { GetCartResType } from "@/schemaValidations/cart.schema";

const cartApiRequest = {
  getDetail: () => http.get<GetCartResType>("api/Cart/details"),
  
};

export default cartApiRequest;
