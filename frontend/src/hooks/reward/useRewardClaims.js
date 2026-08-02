import { useEffect, useState } from "react";
import { getMyRewardClaims } from "../../services/reward-claim/rewardClaim.service";

const useRewardClaims = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const result = await getMyRewardClaims();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRewards();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useRewardClaims;