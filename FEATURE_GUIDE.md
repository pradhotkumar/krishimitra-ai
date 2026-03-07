# 🎯 KrishiMitra Feature Guide

## Quick Navigation
- [Authentication](#1-authentication-page)
- [Dashboard Overview](#2-dashboard-overview)
- [Market Rates](#3-live-market-rates)
- [Leaf Scanner](#4-crop-disease-scanner)
- [Government Schemes](#5-government-schemes)
- [Weather Alerts](#6-weather-alerts)

---

## 1. Authentication Page
**URL**: http://localhost:3000/auth

### What You'll See:
```
┌─────────────────────────────────────┐
│  📱 Welcome to KrishiMitra          │
│  Register with your phone number    │
│                                     │
│  Full Name: [Raj Kumar________]     │
│  Phone: +91 [9876543210_____]       │
│  Language: [हिंदी (Hindi) ▼]        │
│                                     │
│  Captcha: [aBc123]  🔄              │
│  Enter: [____________]              │
│                                     │
│  [    Send OTP    ]                 │
└─────────────────────────────────────┘
```

### After OTP Sent:
```
┌─────────────────────────────────────┐
│  ✉️ Verify OTP                      │
│  Enter 6-Digit OTP                  │
│                                     │
│  [  1  2  3  4  5  6  ]             │
│                                     │
│  Demo: Use 123456 as OTP            │
│                                     │
│  [ Back ]  [ Verify & Login ]       │
│                                     │
│  Resend OTP                         │
└─────────────────────────────────────┘
```

---

## 2. Dashboard Overview
**URL**: http://localhost:3000/dashboard/farmer

### Top Section - Profile:
```
┌─────────────────────────────────────────────────┐
│  Farmer Dashboard                    [Logout]   │
│  Welcome back, Raj Kumar! 🌾                    │
└─────────────────────────────────────────────────┘
```

### Stats Cards:
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 🌱 Active    │ │ ⚠️ Weather   │ │ 💬 AI        │
│    Crops     │ │    Alerts    │ │ Consultations│
│      3       │ │      3       │ │      3       │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Quick Actions:
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 💬 Ask AI    │ │ 🛒 Market    │ │ 📄 Govt      │
│    Expert    │ │    place     │ │    Schemes   │
└──────────────┘ └──────────────┘ └──────────────┘
```

### Latest News:
```
┌─────────────────────────────────────────────────┐
│  📰 Latest Agriculture News                     │
│  ┌───────────────────────────────────────────┐ │
│  │ [Schemes] New PM-KISAN Payment Released   │ │
│  │ Government releases ₹2000 installment...  │ │
│  │ 2 hours ago                               │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 3. Live Market Rates
**Location**: Dashboard Overview (scroll down)

### Display:
```
┌─────────────────────────────────────────────────┐
│  📊 Live Market Rates              🔄           │
│  📍 [Bangalore APMC ▼]                          │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ 🌾 Rice      │  │ 🌾 Wheat     │            │
│  │ ₹2,100       │  │ ₹2,250       │            │
│  │ per quintal  │  │ per quintal  │            │
│  │ ↑ 2.5%       │  │ ↓ 1.2%       │            │
│  └──────────────┘  └──────────────┘            │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐            │
│  │ 🍅 Tomato    │  │ 🧅 Onion     │            │
│  │ ₹25          │  │ ₹18          │            │
│  │ per kg       │  │ per kg       │            │
│  │ ↑ 5.8%       │  │ ↓ 3.4%       │            │
│  └──────────────┘  └──────────────┘            │
│                                                 │
│  Last updated: 10:30 AM                         │
└─────────────────────────────────────────────────┘
```

---

## 4. Crop Disease Scanner
**Access**: Click button in dashboard

### Upload Screen:
```
┌─────────────────────────────────────────────────┐
│  🍃 Crop Disease Scanner              ✕         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │                                           │ │
│  │           📷                              │ │
│  │                                           │ │
│  │     Upload Leaf Photo                     │ │
│  │                                           │ │
│  │  Take a clear photo of the affected leaf  │ │
│  │  for AI analysis                          │ │
│  │                                           │ │
│  │     [📤 Choose Photo]                     │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Analysis Result:
```
┌─────────────────────────────────────────────────┐
│  🍃 Crop Disease Scanner              ✕         │
├─────────────────────────────────────────────────┤
│  [Leaf Image Preview]                           │
│                                                 │
│  ⚠️ Leaf Blight                                 │
│  Confidence: 87%  [Moderate Severity]           │
│                                                 │
│  ✅ Recommended Treatment:                      │
│  1. Remove affected leaves immediately          │
│  2. Apply copper-based fungicide                │
│  3. Ensure proper drainage                      │
│  4. Reduce watering frequency                   │
│                                                 │
│  🛡️ Preventive Measures:                        │
│  • Maintain proper plant spacing                │
│  • Apply neem oil spray weekly                  │
│  • Avoid overhead watering                      │
│                                                 │
│  [Scan Another]  [Save Plan]                    │
└─────────────────────────────────────────────────┘
```

---

## 5. Government Schemes
**Tab**: Click "Govt Schemes" in sidebar

### Display:
```
┌─────────────────────────────────────────────────┐
│  Government Schemes for Farmers                 │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ 💰 PM-KISAN                      [Active] │ │
│  │ Direct income support of ₹6000 per year   │ │
│  │                                           │ │
│  │ Eligibility: All landholding farmers      │ │
│  │ Benefit: ₹6,000/year                      │ │
│  │                                           │ │
│  │ Learn More & Apply →                      │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ 💳 Kisan Credit Card (KCC)       [Active] │ │
│  │ Credit facility for agricultural expenses │ │
│  │                                           │ │
│  │ Eligibility: Farmers with land ownership  │ │
│  │ Benefit: Up to ₹3 lakh credit             │ │
│  │                                           │ │
│  │ Learn More & Apply →                      │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 6. Weather Alerts
**Tab**: Click "Weather Alerts" in sidebar

### Current Weather:
```
┌─────────────────────────────────────────────────┐
│  Current Weather                                │
│  Bangalore                            ☀️        │
│                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Temp     │ │ Humidity │ │ Wind     │        │
│  │ 28°C     │ │ 65%      │ │ 12 km/h  │        │
│  └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

### Weather Alerts:
```
┌─────────────────────────────────────────────────┐
│  Weather Alerts                                 │
│                                                 │
│  ⚠️ Heavy Rainfall Expected        [HIGH]       │
│  Heavy rainfall predicted in next 48 hours.     │
│  Secure crops and ensure drainage.              │
│  2 hours ago                                    │
│                                                 │
│  🌡️ High Temperature Alert        [MODERATE]   │
│  Temperature may exceed 35°C. Increase          │
│  irrigation frequency.                          │
│  5 hours ago                                    │
└─────────────────────────────────────────────────┘
```

---

## 7. My Crops Tab
**Tab**: Click "My Crops" in sidebar

### Crop Cards:
```
┌─────────────────────────────────────────────────┐
│  My Crops                        [+ Add Crop]   │
│                                                 │
│  ┌──────────────────────┐ ┌──────────────────┐ │
│  │ [🌾 Image]           │ │ [🌾 Image]       │ │
│  │ Rice      [Healthy]  │ │ Wheat [Needs    │ │
│  │                      │ │        Attention]│ │
│  │ Area: 2 Acres        │ │ Area: 2 Acres    │ │
│  │ Planted: 2024-01-15  │ │ Planted: 2024-02 │ │
│  │ Harvest: 2024-05-15  │ │ Harvest: 2024-06 │ │
│  │                      │ │                  │ │
│  │ Growth: [████░] 75%  │ │ Growth: [███░░]  │ │
│  │                      │ │                  │ │
│  │ [💧][🌱][🔍]         │ │ [💧][🌱][🔍]     │ │
│  └──────────────────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 8. AI Chat Assistant
**Location**: Floating button (bottom-right corner)

### Chat Widget:
```
                              ┌──────────────────┐
                              │ 🌾 KrishiMitra  ✕│
                              │ Your assistant   │
                              ├──────────────────┤
                              │                  │
                              │ 👋 Hi Raj!       │
                              │ Ask me anything  │
                              │ about farming!   │
                              │                  │
                              │ [Weather?]       │
                              │ [PM-KISAN?]      │
                              │ [Fertilizer?]    │
                              │                  │
                              ├──────────────────┤
                              │ [Type here...] 📤│
                              └──────────────────┘
```

---

## 🎯 How to Test Each Feature

1. **Authentication**: Go to /auth, enter details, use OTP 123456
2. **Dashboard**: After login, explore all tabs in sidebar
3. **Market Rates**: Scroll down in Overview tab
4. **Leaf Scanner**: Look for scan button in dashboard
5. **Schemes**: Click "Govt Schemes" tab
6. **Weather**: Click "Weather Alerts" tab
7. **Crops**: Click "My Crops" tab
8. **AI Chat**: Click floating button bottom-right

---

## 📱 Mobile View

All features are fully responsive and work perfectly on mobile devices!

---

**Enjoy exploring KrishiMitra!** 🌾
