import { get } from "../utils/request";

export const getCategoryList = async () => {
    const result = get("products/categories");
    return result;
}