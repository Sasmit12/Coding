import { useState } from "react";
import Button from "./common/Button";
import Alert from "./common/Alert";

const LoyaltyCard = ({ points, tier, nextTierPoints, benefits, isLoading }) => {
  const [showBenefits, setShowBenefits] = useState(false);
  const [error, setError] = useState("");

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
      </div>
    );
  }

  const getTierColor = (tier) => {
    const colors = {
      Bronze:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Silver: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      Gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Platinum:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[tier] || colors.Bronze;
  };

  const getProgressPercentage = () => {
    if (!nextTierPoints) return 100;
    const currentTierPoints =
      {
        Bronze: 0,
        Silver: 1000,
        Gold: 5000,
        Platinum: 10000,
      }[tier] || 0;

    const nextTierThreshold = currentTierPoints + nextTierPoints;
    const progress = ((points - currentTierPoints) / nextTierPoints) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {error && (
        <Alert type="error" message={error} onClose={() => setError("")} />
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Loyalty Program
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Current Tier:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${getTierColor(tier)}`}
              >
                {tier}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {points.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Points</p>
          </div>
        </div>

        {nextTierPoints > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>
                Progress to {tier === "Platinum" ? "Max Tier" : "Next Tier"}
              </span>
              <span>{nextTierPoints.toLocaleString()} points needed</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <Button
            onClick={() => setShowBenefits(!showBenefits)}
            className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
          >
            {showBenefits ? "Hide Benefits" : "Show Benefits"}
          </Button>

          {showBenefits && (
            <div className="mt-4 space-y-2">
              {benefits?.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="mr-2">✨</span>
                  {benefit}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
