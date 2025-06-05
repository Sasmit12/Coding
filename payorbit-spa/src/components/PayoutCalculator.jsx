"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calculator, DollarSign, AlertCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"

export function PayoutCalculator({ simulationMode }) {
  const [grossEarnings, setGrossEarnings] = useState("1500.00")
  const [platformFeeRate, setPlatformFeeRate] = useState("15")
  const [taxRate, setTaxRate] = useState("25")
  const [additionalDeductions, setAdditionalDeductions] = useState("50.00")
  const [manualOverride, setManualOverride] = useState(false)
  const [manualAmount, setManualAmount] = useState("")

  const [calculations, setCalculations] = useState({
    gross: 0,
    platformFee: 0,
    afterPlatformFee: 0,
    taxes: 0,
    deductions: 0,
    netPayout: 0,
  })

  useEffect(() => {
    const gross = Number.parseFloat(grossEarnings) || 0
    const platformFee = gross * (Number.parseFloat(platformFeeRate) / 100)
    const afterPlatformFee = gross - platformFee
    const taxes = afterPlatformFee * (Number.parseFloat(taxRate) / 100)
    const deductions = Number.parseFloat(additionalDeductions) || 0
    const netPayout = manualOverride ? Number.parseFloat(manualAmount) || 0 : afterPlatformFee - taxes - deductions

    setCalculations({
      gross,
      platformFee,
      afterPlatformFee,
      taxes,
      deductions,
      netPayout,
    })
  }, [grossEarnings, platformFeeRate, taxRate, additionalDeductions, manualOverride, manualAmount])

  const resetCalculator = () => {
    setGrossEarnings("1500.00")
    setPlatformFeeRate("15")
    setTaxRate("25")
    setAdditionalDeductions("50.00")
    setManualOverride(false)
    setManualAmount("")
  }

  return (
    <div className="space-y-6">
      {simulationMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Simulation Mode:</strong> Calculations are for preview only.
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Payout Calculator
            </CardTitle>
            <CardDescription>Enter earnings details to calculate mentor payouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="gross-earnings">Gross Earnings ($)</Label>
              <Input
                id="gross-earnings"
                type="number"
                step="0.01"
                value={grossEarnings}
                onChange={(e) => setGrossEarnings(e.target.value)}
                placeholder="1500.00"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="platform-fee">Platform Fee (%)</Label>
              <Input
                id="platform-fee"
                type="number"
                step="0.1"
                value={platformFeeRate}
                onChange={(e) => setPlatformFeeRate(e.target.value)}
                placeholder="15"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                step="0.1"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="25"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="deductions">Additional Deductions ($)</Label>
              <Input
                id="deductions"
                type="number"
                step="0.01"
                value={additionalDeductions}
                onChange={(e) => setAdditionalDeductions(e.target.value)}
                placeholder="50.00"
              />
            </div>

            <Separator />

            <div className="flex items-center space-x-2">
              <Switch id="manual-override" checked={manualOverride} onCheckedChange={setManualOverride} />
              <Label htmlFor="manual-override">Manual Override</Label>
            </div>

            {manualOverride && (
              <div className="grid gap-2">
                <Label htmlFor="manual-amount">Manual Payout Amount ($)</Label>
                <Input
                  id="manual-amount"
                  type="number"
                  step="0.01"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                  placeholder="Enter manual amount"
                />
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  Manual override will replace calculated amount
                </div>
              </div>
            )}

            <Button onClick={resetCalculator} variant="outline" className="w-full">
              Reset Calculator
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payout Breakdown
            </CardTitle>
            <CardDescription>Detailed calculation breakdown</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Gross Earnings</span>
                <span className="text-sm">${calculations.gross.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-red-600">
                <span className="text-sm">Platform Fee ({platformFeeRate}%)</span>
                <span className="text-sm">-${calculations.platformFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">After Platform Fee</span>
                <span className="text-sm">${calculations.afterPlatformFee.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-red-600">
                <span className="text-sm">Taxes ({taxRate}%)</span>
                <span className="text-sm">-${calculations.taxes.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center text-red-600">
                <span className="text-sm">Additional Deductions</span>
                <span className="text-sm">-${calculations.deductions.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Net Payout</span>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">${calculations.netPayout.toFixed(2)}</span>
                  {manualOverride && <Badge variant="secondary">Manual</Badge>}
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-xs text-green-600 font-medium">Take Home</div>
                <div className="text-lg font-bold text-green-700">
                  {calculations.gross > 0 ? ((calculations.netPayout / calculations.gross) * 100).toFixed(1) : 0}%
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-xs text-red-600 font-medium">Total Deductions</div>
                <div className="text-lg font-bold text-red-700">
                  ${(calculations.platformFee + calculations.taxes + calculations.deductions).toFixed(2)}
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">Generate Payout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}