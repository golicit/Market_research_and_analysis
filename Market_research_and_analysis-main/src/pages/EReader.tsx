import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, CheckCircle, Lock, Moon, Sun, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const EReader = () => {
  const [selectedModule, setSelectedModule] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const studentName = "Rahul Kumar";
  const studentEmail = "rahul.kumar@example.com";

  const modules = [
    {
      id: 1,
      title: "Introduction to Stock Market",
      locked: false,
      content: `# Introduction to Stock Market

Welcome to the world of stock trading! This module will introduce you to the fundamental concepts of the Indian stock market.

## What is the Stock Market?

The stock market is a platform where buyers and sellers come together to trade shares of publicly listed companies. In India, the two main stock exchanges are:

- **NSE (National Stock Exchange)**
- **BSE (Bombay Stock Exchange)**

## Key Concepts

### 1. Stocks and Shares
When you buy a share, you're buying a small piece of ownership in a company. The value of shares fluctuates based on supply, demand, and company performance.

### 2. Market Timings
- Pre-market: 9:00 AM - 9:15 AM
- Regular trading: 9:15 AM - 3:30 PM
- Post-market: 3:40 PM - 4:00 PM

### 3. Types of Markets
- **Primary Market**: Where companies issue new shares (IPO)
- **Secondary Market**: Where existing shares are traded between investors

## Getting Started

To start trading, you need:
1. A Demat account (to hold shares electronically)
2. A trading account (to execute buy/sell orders)
3. A bank account linked to your trading account
4. PAN card and Aadhaar verification

## Risk Factors

⚠️ **Important:** Stock market investments involve risk. Never invest money you can't afford to lose. Always do your research and consider consulting with financial advisors.

---

In the next module, we'll dive into candlestick patterns and how to read price charts effectively.`
    },
    {
      id: 2,
      title: "Candlestick Patterns Basics",
      locked: false,
      content: `# Candlestick Patterns Basics

Candlestick charts are one of the most popular tools for technical analysis in stock trading.

## Understanding Candlesticks

Each candlestick represents price movement during a specific time period (1 minute, 5 minutes, 1 day, etc.)

### Anatomy of a Candlestick

- **Body**: Shows the opening and closing prices
- **Wicks (Shadows)**: Show the high and low prices during that period
- **Color**: 
  - Green/White = Bullish (close > open)
  - Red/Black = Bearish (close < open)

## Basic Patterns

### 1. Doji
A candlestick where open and close are nearly equal. Signals indecision in the market.

### 2. Hammer
Small body at the top with a long lower wick. Bullish reversal signal at the bottom of a downtrend.

### 3. Shooting Star
Small body at the bottom with a long upper wick. Bearish reversal signal at the top of an uptrend.

### 4. Engulfing Pattern
- **Bullish Engulfing**: A large green candle completely engulfs the previous red candle
- **Bearish Engulfing**: A large red candle completely engulfs the previous green candle

## Practical Application

When analyzing candlesticks, always consider:
- The overall trend
- Volume accompanying the pattern
- Support and resistance levels
- Multiple timeframe analysis

## Practice Exercise

📊 Review the charts in your practice account and identify at least 5 doji patterns in different stocks. Note the context (trend, volume) and what happened next.

---

Next module: Advanced Doji Strategies`
    },
    {
      id: 3,
      title: "Advanced Doji Strategies",
      locked: false,
      content: `# Advanced Doji Strategies

Let's dive deeper into doji patterns and how to use them effectively in real trading scenarios.

## Types of Doji Patterns

### 1. Standard Doji
Equal open and close, with wicks on both sides. Shows equilibrium between buyers and sellers.

### 2. Long-Legged Doji
Very long upper and lower wicks. Shows extreme indecision and volatility.

### 3. Dragonfly Doji
Open and close at the high, with a long lower wick. Strong bullish reversal signal.

### 4. Gravestone Doji
Open and close at the low, with a long upper wick. Strong bearish reversal signal.

## Trading Doji Patterns

### Entry Strategy
1. Wait for doji formation at key support/resistance
2. Confirm with next candle (confirmation candle)
3. Enter on confirmation with stop loss

### Stop Loss Placement
- For bullish doji: Place stop below the doji low
- For bearish doji: Place stop above the doji high

### Target Setting
Use 1:2 or 1:3 risk-reward ratio. If risking ₹100, target ₹200-300 profit.

## Real Example

**Reliance Industries - 15-minute chart**

A dragonfly doji formed at ₹2,450 support level:
- Entry: ₹2,460 (after bullish confirmation)
- Stop loss: ₹2,440 (below doji low)
- Target: ₹2,500 (1:2 ratio)
- Result: Target achieved in 2 hours

## Common Mistakes to Avoid

❌ Trading doji in isolation without trend context
❌ Not waiting for confirmation
❌ Ignoring volume
❌ Poor stop loss management

✅ Always combine doji with support/resistance, trend, and volume analysis.

---

Next: F&O Trading Fundamentals`
    },
    {
      id: 4,
      title: "F&O Trading Fundamentals",
      locked: false,
      content: `# F&O Trading Fundamentals

Futures and Options (F&O) are derivative instruments that derive their value from underlying assets like stocks or indices.

## What are Futures?

A futures contract is an agreement to buy or sell an asset at a predetermined price on a specific future date.

### Key Terms
- **Lot Size**: Minimum number of shares in one contract
- **Expiry**: Last Thursday of every month
- **Margin**: Money required to take a position (typically 15-20% of contract value)

### Example
Nifty Future at 19,500:
- Lot size: 50
- Contract value: 19,500 × 50 = ₹9,75,000
- Margin required: ~₹1,50,000

## What are Options?

Options give you the RIGHT (not obligation) to buy or sell at a specific price.

### Types
1. **Call Option**: Right to BUY
2. **Put Option**: Right to SELL

### Key Concepts
- **Strike Price**: The price at which you can buy/sell
- **Premium**: Price you pay for the option
- **In-the-Money (ITM)**: Profitable if exercised now
- **At-the-Money (ATM)**: Strike = Current price
- **Out-of-the-Money (OTM)**: Not profitable if exercised now

## F&O Strategies for Beginners

### 1. Buying Calls (Bullish View)
Buy call option when expecting price to rise. Limited risk (premium paid), unlimited profit potential.

### 2. Buying Puts (Bearish View)
Buy put option when expecting price to fall. Limited risk (premium paid), high profit potential.

### 3. Covered Call (Conservative)
Own the stock + sell call option. Generate income from premium.

## Risk Management in F&O

⚠️ **Critical Rules:**
- Never risk more than 2% of capital per trade
- Always use stop losses
- Don't trade with borrowed money
- Start small, learn first
- Track all trades in a journal

## Common Pitfalls

1. Over-leveraging
2. Holding positions till expiry without plan
3. Ignoring time decay in options
4. Trading without understanding Greeks (Delta, Theta, etc.)

---

Master these basics before moving to advanced strategies!`
    },
    {
      id: 5,
      title: "Risk Management",
      locked: true,
      content: "This module will be unlocked after completing previous modules."
    },
    {
      id: 6,
      title: "Technical Indicators",
      locked: true,
      content: "This module will be unlocked after completing previous modules."
    },
    {
      id: 7,
      title: "Real Trade Case Studies",
      locked: true,
      content: "This module will be unlocked after completing previous modules."
    },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="bg-gradient-hero text-primary-foreground border-b border-border sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/20">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <h1 className="text-xl font-bold hidden md:block">F&O Trading Course E-Reader</h1>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-primary-foreground hover:bg-primary-foreground/20"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar - Module List */}
          <aside className="w-80 bg-card border-r border-border h-[calc(100vh-73px)] sticky top-[73px]">
            <div className="p-4 border-b border-border">
              <h2 className="font-bold text-primary text-lg">Course Modules</h2>
              <p className="text-sm text-muted-foreground mt-1">Select a module to read</p>
            </div>
            
            <ScrollArea className="h-[calc(100vh-145px)]">
              <div className="p-4 space-y-2">
                {modules.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => !module.locked && setSelectedModule(index)}
                    disabled={module.locked}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedModule === index 
                        ? 'bg-accent text-accent-foreground shadow-md' 
                        : module.locked 
                        ? 'bg-secondary opacity-60 cursor-not-allowed' 
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">Module {module.id}</span>
                          {module.locked ? (
                            <Lock className="h-3 w-3" />
                          ) : (
                            <CheckCircle className="h-3 w-3 text-success" />
                          )}
                        </div>
                        <p className="font-semibold text-sm">{module.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </aside>

          {/* Main Reading Panel */}
          <main className="flex-1">
            {/* Watermark Header */}
            <div className="bg-secondary border-b border-border px-6 py-3 text-center">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{studentName}</strong> | {studentEmail} | Licensed Copy - Do Not Share
              </p>
            </div>

            {/* Content Area */}
            <ScrollArea className="h-[calc(100vh-145px)]">
              <div className="container max-w-4xl mx-auto px-6 py-8">
                {modules[selectedModule].locked ? (
                  <Card className="border-2 border-dashed border-muted">
                    <CardContent className="pt-12 pb-12 text-center">
                      <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-primary mb-2">Module Locked</h2>
                      <p className="text-muted-foreground mb-6">
                        Complete previous modules to unlock this content.
                      </p>
                      <Link to="/dashboard">
                        <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          Return to Dashboard
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="mb-6">
                      <Badge className="bg-success text-success-foreground mb-2">
                        Module {modules[selectedModule].id}
                      </Badge>
                      <h1 className="text-4xl font-bold text-primary mb-2">
                        {modules[selectedModule].title}
                      </h1>
                    </div>
                    
                    {/* Render content with basic markdown-like formatting */}
                    <div className="space-y-6 text-foreground leading-relaxed">
                      {modules[selectedModule].content.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('# ')) {
                          return <h1 key={idx} className="text-3xl font-bold text-primary mt-8 mb-4">{paragraph.slice(2)}</h1>;
                        } else if (paragraph.startsWith('## ')) {
                          return <h2 key={idx} className="text-2xl font-bold text-primary mt-6 mb-3">{paragraph.slice(3)}</h2>;
                        } else if (paragraph.startsWith('### ')) {
                          return <h3 key={idx} className="text-xl font-semibold text-primary mt-4 mb-2">{paragraph.slice(4)}</h3>;
                        } else if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                          const items = paragraph.split('\n');
                          return (
                            <ul key={idx} className="list-disc list-inside space-y-2 ml-4">
                              {items.map((item, i) => (
                                <li key={i}>{item.slice(2)}</li>
                              ))}
                            </ul>
                          );
                        } else if (paragraph.match(/^\d+\./)) {
                          const items = paragraph.split('\n');
                          return (
                            <ol key={idx} className="list-decimal list-inside space-y-2 ml-4">
                              {items.map((item, i) => (
                                <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                              ))}
                            </ol>
                          );
                        } else if (paragraph.startsWith('⚠️') || paragraph.startsWith('❌') || paragraph.startsWith('✅') || paragraph.startsWith('📊') || paragraph.startsWith('📚')) {
                          return (
                            <Card key={idx} className="bg-secondary border-l-4 border-accent">
                              <CardContent className="pt-4">
                                <p>{paragraph}</p>
                              </CardContent>
                            </Card>
                          );
                        } else if (paragraph.startsWith('**')) {
                          return <p key={idx} className="font-bold">{paragraph.replace(/\*\*/g, '')}</p>;
                        } else if (paragraph.startsWith('---')) {
                          return <hr key={idx} className="my-8 border-border" />;
                        } else {
                          return <p key={idx} className="text-foreground">{paragraph}</p>;
                        }
                      })}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Bottom Action Bar */}
            <div className="bg-card border-t border-border px-6 py-4">
              <div className="flex justify-between items-center">
                <Link to="/dashboard">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                
                <Button 
                  onClick={() => window.open("https://wa.me/919876543210", "_blank")}
                  className="bg-success hover:bg-success/90 text-success-foreground"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Support Chat
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EReader;
