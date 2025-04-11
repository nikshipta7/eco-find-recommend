
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Leaf } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  // Data for the score donut chart
  const scoreData = [
    { name: 'Score', value: 57 },
    { name: 'Remaining', value: 43 },
  ];

  // Data for the carbon footprint bar chart
  const carbonData = [
    { name: 'Q1', value: 8.0 },
    { name: 'Q2', value: 6.4 },
    { name: 'Q3', value: 4.2 },
    { name: 'Q4', value: 2.1 },
  ];

  // Data for the star products pie chart
  const productData = [
    { name: 'Recycled', value: 50, color: '#0bb07b' },
    { name: 'Organic', value: 30, color: '#4bc0c0' },
    { name: 'Other', value: 20, color: '#a5e7e2' },
  ];

  // Data for recent purchases
  const recentPurchases = [
    { id: 1, name: 'Reusable Bags', count: 2, date: '2024-04-05', price: 33 },
    { id: 2, name: 'Eco Cleaners', count: 5, date: '2024-04-01', price: 5.63 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-md border border-gray-200"
            />
          </div>
        </div>

        {/* Top row cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* EcoScore Card */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-700">EcoScore</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={scoreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={50}
                        fill="#0bb07b"
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        <Cell key="score" fill="#0bb07b" />
                        <Cell key="remaining" fill="#e5f7f0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-green-600">57%</span>
                    <span className="text-sm text-gray-500">EcoScore</span>
                  </div>
                </div>
                <div className="flex justify-between w-full mt-4">
                  <div className="flex flex-col items-center">
                    <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">28</div>
                    <span className="text-xs text-gray-500 mt-1">Environmental</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-800">
                    $44.60<span className="text-sm text-gray-500">/mo</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center text-white text-xs">24</div>
                    <span className="text-xs text-gray-500 mt-1">Social</span>
                  </div>
                </div>
                <div className="w-full mt-4 text-center">
                  <span className="text-2xl font-bold text-gray-800">$79.00</span>
                  <span className="text-sm text-gray-500">/yr</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Carbon Footprint Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-700">Carbon Footprint</CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={carbonData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0bb07b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-4">
                <span className="text-2xl font-bold text-gray-800">$8,100</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Purchases Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-700">Recent Purchases</CardTitle>
              <p className="text-sm text-gray-500">By Dashboard</p>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Organic Products</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">12</span>
                    <div className="w-16 bg-gray-200 h-1 rounded-full">
                      <div className="bg-green-600 h-1 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Renewable Energy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">8</span>
                    <div className="w-16 bg-gray-200 h-1 rounded-full">
                      <div className="bg-yellow-400 h-1 rounded-full w-1/2"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Sustainable Fashion</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">15</span>
                    <div className="w-16 bg-gray-200 h-1 rounded-full">
                      <div className="bg-green-500 h-1 rounded-full w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Purchased */}
        <div className="mb-8">
          <Card className="bg-green-800 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Recently Purchased</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recentPurchases.map((purchase, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-4xl font-bold mb-2">${purchase.price}</div>
                    <div className="text-sm opacity-80">{purchase.name}</div>
                  </div>
                ))}
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 p-4 rounded-md">
                    <div className="h-12 w-12 bg-white/20 rounded-md"></div>
                  </div>
                  <div className="text-sm opacity-80 mt-2">Reusable Bag</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-white/10 p-4 rounded-md">
                    <div className="h-12 w-12 bg-white/20 rounded-md"></div>
                  </div>
                  <div className="text-sm opacity-80 mt-2">Eco Cleaner</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Star Product Chart */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-gray-700">Star Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <div className="w-1/2">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-xs text-gray-500">Total Products</div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Organic</span>
                      <span className="text-sm text-gray-600">50%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Recycled</span>
                      <span className="text-sm text-gray-600">30%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Other</span>
                      <span className="text-sm text-gray-600">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-teal-200 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
