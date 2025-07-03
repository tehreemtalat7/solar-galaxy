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
      case '50-100':
        systemSize = 4.5;
        estimatedCost = 11250;
        monthlySavings = 75;
        break;
      case '100-150':
        systemSize = 6.5;
        estimatedCost = 16250;
        monthlySavings = 110;
        break;
      case '150-200':
        systemSize = 8.5;
        estimatedCost = 21250;
        monthlySavings = 145;
        break;
      case '200-300':
        systemSize = 12;
        estimatedCost = 30000;
        monthlySavings = 200;
        break;
      case '300+':
        systemSize = 15;
        estimatedCost = 37500;
        monthlySavings = 275;
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
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100-150">$100 - $150</SelectItem>
              <SelectItem value="150-200">$150 - $200</SelectItem>
              <SelectItem value="200-300">$200 - $300</SelectItem>
              <SelectItem value="300+">$300+</SelectItem>
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
                  <div className="font-bold text-solar-orange">${results.estimatedCost.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-600">Monthly Savings</div>
                  <div className="font-bold text-solar-green">${results.monthlySavings}</div>
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
