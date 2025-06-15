"use client"

import { useState } from "react"
import { Search, MapPin, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HeroSection({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [filterType, setFilterType] = useState("All")

  const handleSearch = () => {
    onSearch(searchQuery, location, filterType)
  }

  return (
    <section className="relative bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg?height=400&width=1200')",
        }}
      />
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          HarvestLink
          <span className="text-green-600 dark:text-green-400"> - Fresh From Farm</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect directly with local farmers and enjoy the freshest produce delivered straight to your door
        </p>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Product Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for products (e.g., Tomatoes, Eggs)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Location */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="w-full md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <Filter className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Products</SelectItem>
                  <SelectItem value="Organic">Organic Only</SelectItem>
                  <SelectItem value="Seasonal">Seasonal</SelectItem>
                  <SelectItem value="Local">Local Farms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700 text-white">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
