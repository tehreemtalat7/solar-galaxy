import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, CheckCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface QuoteResults {
  systemSize: number;
  estimatedCost: number;
  monthlySavings: number;
  paybackPeriod: number;
}

interface QuoteCalculatorProps {
  onQuoteCalculated?: (results: QuoteResults) => void;
}

export default function QuoteCalculator({ onQuoteCalculated }: QuoteCalculatorProps) {
  const [monthlyBill, setMonthlyBill] = useState("");
  const [homeSize, setHomeSize] = useState("");
  const [results, setResults] = useState<QuoteResults | null>(null);

  const calculateQuote = () => {
    if (!monthlyBill || !homeSize) {
      alert('Please fill in all required fields');
      return;
    }

    trackEvent('quote_calculated', 'engagement', 'quote_calculator');

    // Simple calculation logic based on monthly bill range
    let systemSize = 0;
    let estimatedCost = 0;
    let monthlySavings = 0;

    switch(monthlyBill) {
      case '15000-25000':
        systemSize = 4.5;
        estimatedCost = 3200000; // PKR 3.2M
        monthlySavings = 20000; // PKR 20,000
        break;
      case '25000-40000':
        systemSize = 6.5;
        estimatedCost = 4600000; // PKR 4.6M
        monthlySavings = 30000; // PKR 30,000
        break;
      case '40000-60000':
        systemSize = 8.5;
        estimatedCost = 6000000; // PKR 6M
        monthlySavings = 40000; // PKR 40,000
        break;
      case '60000-85000':
        systemSize = 12;
        estimatedCost = 8500000; // PKR 8.5M
        monthlySavings = 55000; // PKR 55,000
        break;
      case '85000+':
        systemSize = 15;
        estimatedCost = 10600000; // PKR 10.6M
        monthlySavings = 75000; // PKR 75,000
        break;
    }

    const paybackPeriod = parseFloat((estimatedCost / (monthlySavings * 12)).toFixed(1));

    const calculatedResults = {
      systemSize,
      estimatedCost,
      monthlySavings,
      paybackPeriod,
    };

    setResults(calculatedResults);
    onQuoteCalculated?.(calculatedResults);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Quick Quote Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="monthlyBill">Average Monthly Electric Bill</Label>
          <Select value={monthlyBill} onValueChange={setMonthlyBill}>
            <SelectTrigger>
              <SelectValue placeholder="Select Bill Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15000-25000">PKR 15,000 - 25,000</SelectItem>
              <SelectItem value="25000-40000">PKR 25,000 - 40,000</SelectItem>
              <SelectItem value="40000-60000">PKR 40,000 - 60,000</SelectItem>
              <SelectItem value="60000-85000">PKR 60,000 - 85,000</SelectItem>
              <SelectItem value="85000+">PKR 85,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="homeSize">Home Size (Square Feet)</Label>
          <Input 
            id="homeSize"
            type="number"
            value={homeSize}
            onChange={(e) => setHomeSize(e.target.value)}
            placeholder="e.g., 2000"
          />
        </div>

        <Button 
          onClick={calculateQuote}
          className="w-full bg-solar-orange hover:bg-solar-orange-light text-white"
        >
          Calculate Quote
        </Button>

        {results && (
          <Card className="bg-solar-green bg-opacity-10 border-solar-green">
            <CardContent className="p-4">
              <h4 className="font-semibold text-neutral-dark mb-3">Estimated Results</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">System Size</div>
                  <div className="font-bold text-solar-green">{results.systemSize} kW</div>
                </div>
                <div>
                  <div className="text-gray-600">Est. Cost</div>
                  <div className="font-bold text-solar-orange">PKR {results.estimatedCost.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Monthly Savings</div>
                  <div className="font-bold text-solar-green">PKR {results.monthlySavings.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Payback Period</div>
                  <div className="font-bold text-solar-orange">{results.paybackPeriod} years</div>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-white rounded text-xs">
                <p className="text-gray-600 mb-1">Includes:</p>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-solar-green mr-1" />
                    High-efficiency panels
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-solar-green mr-1" />
                    Professional installation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-solar-green mr-1" />
                    25-year warranty
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
