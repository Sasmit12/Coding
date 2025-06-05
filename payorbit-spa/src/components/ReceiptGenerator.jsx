"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Receipt, Send, Download, Eye } from "lucide-react"

export function ReceiptGenerator({ simulationMode }) {
  const [receiptData, setReceiptData] = useState({
    mentorName: "Dr. Sarah Johnson",
    period: "2024-01-01 to 2024-01-31",
    totalSessions: "12",
    totalHours: "18.5",
    grossEarnings: "925.00",
    platformFee: "138.75",
    taxes: "196.56",
    deductions: "25.00",
    netPayout: "564.69",
    message: "Thank you for your excellent mentoring services this month!",
  })

  const [previewMode, setPreviewMode] = useState(false)

  const handleInputChange = (field, value) => {
    setReceiptData((prev) => ({ ...prev, [field]: value }))
  }

  const generateReceipt = () => {
    setPreviewMode(true)
  }

  const sendReceipt = () => {
    alert("Receipt sent successfully!")
  }

  const downloadReceipt = () => {
    alert("Receipt downloaded as PDF!")
  }

  if (previewMode) {
    return (
      <div className="space-y-6">
        {simulationMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Simulation Mode:</strong> Receipt preview only - no actual sending.
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Receipt Preview</h2>
          <Button variant="outline" onClick={() => setPreviewMode(false)}>
            <Eye className="mr-2 h-4 w-4" />
            Edit Receipt
          </Button>
        </div>

        {/* Receipt Preview */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center border-b">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
                <Receipt className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">PayOrbit</CardTitle>
            <CardDescription>Payout Receipt</CardDescription>
            <Badge variant="outline" className="w-fit mx-auto mt-2">
              Receipt #PO-{Date.now().toString().slice(-6)}
            </Badge>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Mentor Info */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Mentor Information</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{receiptData.mentorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period:</span>
                  <span className="font-medium">{receiptData.period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date Generated:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Session Summary */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Session Summary</h3>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Sessions:</span>
                  <span className="font-medium">{receiptData.totalSessions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Hours:</span>
                  <span className="font-medium">{receiptData.totalHours}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Financial Breakdown */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Financial Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Earnings</span>
                  <span className="font-medium">${receiptData.grossEarnings}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Platform Fee (15%)</span>
                  <span>-${receiptData.platformFee}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Taxes</span>
                  <span>-${receiptData.taxes}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Other Deductions</span>
                  <span>-${receiptData.deductions}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold text-green-600">
                  <span>Net Payout</span>
                  <span>${receiptData.netPayout}</span>
                </div>
              </div>
            </div>

            {receiptData.message && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Message</h3>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">{receiptData.message}</p>
                </div>
              </>
            )}

            <Separator />

            <div className="text-center text-xs text-muted-foreground">
              <p>This is an automated receipt generated by PayOrbit.</p>
              <p>For questions, please contact support@payorbit.com</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={sendReceipt} className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Receipt
          </Button>
          <Button variant="outline" onClick={downloadReceipt} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {simulationMode && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Simulation Mode:</strong> Receipt generation is for preview only.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Receipt Generator
          </CardTitle>
          <CardDescription>Generate detailed payout receipts for mentors</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="mentor-name">Mentor Name</Label>
                <Input
                  id="mentor-name"
                  value={receiptData.mentorName}
                  onChange={(e) => handleInputChange("mentorName", e.target.value)}
                  placeholder="Enter mentor name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="period">Period</Label>
                <Input
                  id="period"
                  value={receiptData.period}
                  onChange={(e) => handleInputChange("period", e.target.value)}
                  placeholder="2024-01-01 to 2024-01-31"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="total-sessions">Total Sessions</Label>
                <Input
                  id="total-sessions"
                  type="number"
                  value={receiptData.totalSessions}
                  onChange={(e) => handleInputChange("totalSessions", e.target.value)}
                  placeholder="12"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="total-hours">Total Hours</Label>
                <Input
                  id="total-hours"
                  type="number"
                  step="0.5"
                  value={receiptData.totalHours}
                  onChange={(e) => handleInputChange("totalHours", e.target.value)}
                  placeholder="18.5"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="gross-earnings">Gross Earnings ($)</Label>
                <Input
                  id="gross-earnings"
                  type="number"
                  step="0.01"
                  value={receiptData.grossEarnings}
                  onChange={(e) => handleInputChange("grossEarnings", e.target.value)}
                  placeholder="925.00"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="platform-fee">Platform Fee ($)</Label>
                <Input
                  id="platform-fee"
                  type="number"
                  step="0.01"
                  value={receiptData.platformFee}
                  onChange={(e) => handleInputChange("platformFee", e.target.value)}
                  placeholder="138.75"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="taxes">Taxes ($)</Label>
                <Input
                  id="taxes"
                  type="number"
                  step="0.01"
                  value={receiptData.taxes}
                  onChange={(e) => handleInputChange("taxes", e.target.value)}
                  placeholder="196.56"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="deductions">Other Deductions ($)</Label>
                <Input
                  id="deductions"
                  type="number"
                  step="0.01"
                  value={receiptData.deductions}
                  onChange={(e) => handleInputChange("deductions", e.target.value)}
                  placeholder="25.00"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="net-payout">Net Payout ($)</Label>
                <Input
                  id="net-payout"
                  type="number"
                  step="0.01"
                  value={receiptData.netPayout}
                  onChange={(e) => handleInputChange("netPayout", e.target.value)}
                  placeholder="564.69"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">Optional Message</Label>
            <Textarea
              id="message"
              value={receiptData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Add a personal message for the mentor..."
              rows={3}
            />
          </div>

          <Button onClick={generateReceipt} className="w-full">
            <Receipt className="mr-2 h-4 w-4" />
            Generate Receipt Preview
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}