"use client"

import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function FilterSidebar({ filters, onFiltersChange }) {
  const updateFilters = (updates) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const handleTagToggle = (tag, checked) => {
    const newTags = checked ? [...filters.tags, tag] : filters.tags.filter((t) => t !== tag)
    updateFilters({ tags: newTags })
  }

  const handleFarmTypeToggle = (farmType, checked) => {
    const newFarmTypes = checked ? [...filters.farmType, farmType] : filters.farmType.filter((t) => t !== farmType)
    updateFilters({ farmType: newFarmTypes })
  }

  const availableTags = ["Organic", "Seasonal", "Fresh", "Free-Range", "Local", "Heirloom", "Herbs"]
  const farmTypes = ["Urban", "Rural"]

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value })}
            max={50}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Tags */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Tags</Label>
          <div className="space-y-2">
            {availableTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={filters.tags.includes(tag)}
                  onCheckedChange={(checked) => handleTagToggle(tag, checked)}
                />
                <Label htmlFor={tag} className="text-sm cursor-pointer">
                  {tag}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Farm Type */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Farm Type</Label>
          <div className="space-y-2">
            {farmTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type}
                  checked={filters.farmType.includes(type)}
                  onCheckedChange={(checked) => handleFarmTypeToggle(type, checked)}
                />
                <Label htmlFor={type} className="text-sm cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Distance */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Distance: {filters.distance} miles</Label>
          <Slider
            value={[filters.distance]}
            onValueChange={(value) => updateFilters({ distance: value[0] })}
            max={50}
            min={1}
            step={1}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}
