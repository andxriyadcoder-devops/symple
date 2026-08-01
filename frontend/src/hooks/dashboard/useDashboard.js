import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../services/dashboard/dashboard.service";

const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
};

export default useDashboard;