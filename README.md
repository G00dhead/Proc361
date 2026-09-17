# Proc361 | China Sourcing, RMB Wallet & Consolidation Console

An operations dashboard for cross-border China sourcing, direct factory procurement (1688, Taobao, Weidian), multi-currency RMB escrow management, warehouse quality control (QC), and shipping consolidation.

---

## Key Features

### 1. Dual-Zone Action Architecture
- **Needs Action Zone**: Surfaces urgent, blocker-level operational tasks requiring immediate buyer attention:
  - Escrow payment authorization & supplier deposit release
  - Pantone/CAD sample customization approvals
  - Factory shipping address error resolutions
  - High-resolution QC photo inspection sign-offs
  - Ready-to-consolidate warehouse package alerts
- **In-Progress Logistics Pipeline**: Tracks active consignments across end-to-end milestone stages:
  - Sourcing & Factory Communication
  - China Domestic Transit (SF Express, ZTO, Deppon)
  - Warehouse Receiving & Dimensional Weighing
  - Hub Storage & Bin Allocation
  - International Air Express, Air Cargo, or Sea DDP Transit
  - Customs Clearance & Final-Mile Delivery

### 2. Multi-Currency RMB Escrow Wallet
- Real-time Bank of China Spot FX integration (USD ⇄ CNY & EUR ⇄ CNY).
- Live available balance, locked factory escrow reserves, and auto-converting RMB/USD calculators.
- Top-up modal with payment methods (Wire Transfer, Card, Alipay/WeChat Pay, Virtual Accounts).
- Transparent fee breakdowns and transaction audit logs.

### 3. Warehouse Hubs & Quality Control (QC)
- Unified multi-hub tracking across major export facilities:
  - **Guangdong Hub** (Dongguan)
  - **Shenzhen Central Hub** (Bao'an)
  - **Yiwu Export Terminal** (Zhejiang)
- Multi-angle high-resolution photo proof viewer with zoom, pass/fail status, defect tagging, and warehouse inspector notes.

### 4. Smart Freight Consolidation Engine
- Select multiple stored packages to combine into a single international shipment.
- **Custom Packaging Options**: Waterproof shrink wrap, bubble reinforcement, reinforced corner protectors, or custom wooden crating.
- **Shipping Method Comparator**: Dynamic rates, transit times, and volumetric weight calculations for:
  - DHL/FedEx Air Express (3–5 days)
  - Air Cargo Expedited (6–9 days)
  - Matson Sea Shipping DDP (18–25 days)
  - China-Europe Railway Express (16–22 days)

### 5. Sourcing & Order Velocity Analytics
- High-precision SVG and bar visualizations showing monthly and weekly purchasing volumes in both USD and RMB.
- Fulfilled vs. QC returned/cancelled order metrics.
- Touch-friendly, responsive canvas with floating inspect tooltips.

### 6. Internationalization & Workflow Tools
- Instant bilingual localization between **English** and **Chinese (简体中文)**.
- High-density search, tag filtering, and CSV export of all procurement and tracking data.

### 7. Modern UI & Icon System
- Clean, high-density visual hierarchy designed for supply-chain operations.
- **Hugeicons**: Comprehensive, crisp vector iconography across navigation, order status tags, action triage modals, and tracking pipelines.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Hugeicons](https://hugeicons.com/)
- **Typography**: Rethink Sans & JetBrains Mono

---

## Project Structure

```text
├── src/
│   ├── components/                 # UI components and modules
│   │   ├── TopBar.tsx              # Header console, FX rate, notifications, quick actions
│   │   ├── MenuBar.tsx             # Navigation tabs, search, and view switches
│   │   ├── ActionZone.tsx          # "Needs Action" urgent item cards and triage
│   │   ├── InProgressZone.tsx      # Multi-stage tracking pipeline cards
│   │   ├── OrdersTable.tsx         # Tabular view with filtering and bulk actions
│   │   ├── OrderRow.tsx            # Expandable order row item
│   │   ├── SourcingAnalyticsSection.tsx # Order volume and velocity SVG charts
│   │   ├── ConsolidationDrawer.tsx # Multi-package shipment consolidation drawer
│   │   ├── OrderDetailDrawer.tsx   # Detailed order view, tracking timeline, and QC specs
│   │   ├── PhotoModal.tsx          # High-resolution warehouse QC photo gallery
│   │   ├── WalletModal.tsx         # RMB top-up and escrow balance manager
│   │   ├── NewOrderModal.tsx       # Manual order creation modal
│   │   ├── ActionModal.tsx         # Blocker resolution modal (payment, address, specs)
│   │   └── FilterBar.tsx           # Multi-criteria filter strip
│   ├── context/                    # React Context providers (orders, wallet, i18n)
│   ├── data/                       # Seed orders, warehouses, and freight options
│   ├── i18n/                       # Translation dictionaries (EN / ZH)
│   ├── types.ts                    # Global TypeScript interfaces and domain types
│   ├── index.css                   # Global styles & Tailwind CSS configuration
│   ├── App.tsx                     # Main layout and view coordination
│   └── main.tsx                    # React application entry point
├── metadata.json                   # Application metadata configuration
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript compiler configuration
└── vite.config.ts                  # Vite build and plugin setup
```

---

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server on `http://localhost:3000`:
```bash
npm run dev
```

### Production Build

Compile the application for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Code Quality

Run the TypeScript compiler to check for type errors:
```bash
npm run lint
```

---

## License

Private and proprietary. All rights reserved.
