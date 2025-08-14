import React from 'react';

// Asset imports (these would be served from your assets folder)
const imgChart = "/assets/chart.svg";
const imgShape = "/assets/shape.svg";
const imgShape1 = "/assets/shape1.svg";
const imgLine = "/assets/line.svg";

interface SpendingItem {
  category: string;
  amount: number;
  limit: number;
  color: string;
}

interface SpendingDashboardProps {
  totalSpent?: number;
  totalLimit?: number;
  spendingItems?: SpendingItem[];
}

const defaultSpendingItems: SpendingItem[] = [
  {
    category: "Entertainment",
    amount: 15.00,
    limit: 50.00,
    color: "#82c9d7" // cyan
  },
  {
    category: "Bills",
    amount: 150.00,
    limit: 750.00,
    color: "#82c9d7" // cyan
  },
  {
    category: "Dining Out",
    amount: 133.00,
    limit: 75.00,
    color: "#f2cdac" // yellow
  },
  {
    category: "Personal Care",
    amount: 40.00,
    limit: 100.00,
    color: "#626070" // navy
  }
];

export default function SpendingDashboard({
  totalSpent = 338,
  totalLimit = 975,
  spendingItems = defaultSpendingItems
}: SpendingDashboardProps) {
  return (
    <div
      className="bg-white relative rounded-xl w-full h-full"
      data-name="Left Side"
    >
      <div className="relative w-full h-full">
        <div className="box-border flex flex-col gap-8 items-start justify-start overflow-hidden p-8 relative w-full h-full">
          
          {/* Chart Section */}
          <div className="flex flex-row gap-2 h-[280px] items-center justify-center p-0 relative w-full">
            <div className="relative flex items-center justify-center">
              
              {/* Donut Chart Container */}
              <div className="relative w-60 h-60">
                {/* Outer Ring - represents spending categories */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 240 240">
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#f2f2f2"
                    strokeWidth="20"
                  />
                  
                  {/* Entertainment segment */}
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#82c9d7"
                    strokeWidth="20"
                    strokeDasharray={`${(15/975) * 565.48} 565.48`}
                    strokeDashoffset="0"
                    className="transition-all duration-300"
                  />
                  
                  {/* Bills segment */}
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#82c9d7"
                    strokeWidth="20"
                    strokeDasharray={`${(150/975) * 565.48} 565.48`}
                    strokeDashoffset={`-${(15/975) * 565.48}`}
                    className="transition-all duration-300"
                  />
                  
                  {/* Dining Out segment */}
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#f2cdac"
                    strokeWidth="20"
                    strokeDasharray={`${(133/975) * 565.48} 565.48`}
                    strokeDashoffset={`-${((15+150)/975) * 565.48}`}
                    className="transition-all duration-300"
                  />
                  
                  {/* Personal Care segment */}
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    fill="none"
                    stroke="#626070"
                    strokeWidth="20"
                    strokeDasharray={`${(40/975) * 565.48} 565.48`}
                    strokeDashoffset={`-${((15+150+133)/975) * 565.48}`}
                    className="transition-all duration-300"
                  />
                </svg>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[32px] font-bold leading-[1.2] text-[#201f24] font-['Public_Sans']">
                    ${totalSpent}
                  </div>
                  <div className="text-[12px] font-normal leading-[1.5] text-[#696868] font-['Public_Sans']">
                    of ${totalLimit} limit
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spending Summary Section */}
          <div className="flex flex-col gap-6 items-start justify-start relative w-full">
            <div className="text-[20px] font-bold leading-[1.2] text-[#201f24] font-['Public_Sans']">
              Spending Summary
            </div>
            
            <div className="flex flex-col gap-4 items-start justify-start relative w-full">
              {spendingItems.map((item, index) => (
                <div key={index} className="flex flex-row gap-4 items-center justify-between relative w-full">
                  <div className="flex flex-row gap-4 items-center justify-start">
                    <div 
                      className="w-1 h-[43px] rounded-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="text-[14px] font-normal leading-[1.5] text-[#696868] font-['Public_Sans']">
                      {item.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 items-end justify-center">
                    <div className="text-[14px] font-bold leading-[1.5] text-[#201f24] font-['Public_Sans']">
                      ${item.amount.toFixed(2)}
                    </div>
                    <div className="text-[12px] font-normal leading-[1.5] text-[#696868] font-['Public_Sans']">
                      of ${item.limit.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
