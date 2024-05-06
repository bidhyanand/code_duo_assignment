import { toast } from "react-hot-toast";

export const handleResponse = (response: any) => {
  if (response.type === "success") {
    toast.success(response.message || "Success");
  } else if (response.type === "error") {
    toast.error(response.message || "An error occurred");
  }
};
