# Proc360

A B2B sourcing and cross border procurement dashboard. Built for buyers who order from Chinese wholesale marketplaces and factories and need one place to track everything from first contact to final delivery.

## Overview

Proc360 splits order management into two zones.

**Needs Action** is the urgent triage view. Anything that needs a decision, a payment, or a reply shows up here first.

**In Progress** is the logistics tracker. Once an order is moving, it lives here until it lands.

Orders route through three China warehouse hubs: Guangdong, Shenzhen, and Yiwu. Sourcing connects directly to 1688, Taobao, Weidian, and OEM factories, so buyers aren't stuck relying on a middleman for every step.

## Features

**RMB Escrow Wallet**
Holds funds in RMB and tracks live spot FX rates from Bank of China, so buyers know the real cost of every payment before it goes out.

**Freight Consolidation Engine**
Combines multiple orders into a single shipment, which cuts freight cost per unit for buyers running several small orders at once.

**Warehouse QC Photo Inspection**
High resolution photo checks at the warehouse before anything ships, so buyers catch defects early instead of finding out after delivery.

**Sourcing Velocity Analytics**
Interactive SVG charts showing how fast orders move from sourcing to delivery, so buyers can spot bottlenecks in their own pipeline.

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS v4
- Motion
- Lucide React

## Project Structure

```
src/
├── components/   UI components
├── context/      App state and providers
├── data/         Static and mock data
├── i18n/         Localization files
└── ...
```

## Getting Started

Install dependencies, then run:

```bash
npm run dev       # start local development
npm run build     # production build
npm run lint      # TypeScript linting
```
