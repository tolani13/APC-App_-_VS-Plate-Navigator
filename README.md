# APC Application & VS Plate Navigator

A sales-discovery knowledge base for Camfil APC (air pollution control) sellers, organized around the ACGIH *Industrial Ventilation* Chapter 13 taxonomy of specific operations.

## What it does

Sellers can search by **application, industry, contaminant, equipment, or existing condition**. Each result shows:

- Application overview and ACGIH Chapter 13 / VS plate reference
- Source-capture considerations
- Discovery questions to ask on a call
- Technical & safety red flags
- Approved Camfil solution narrative
- Likely stakeholders
- Site-survey requirements
- Aftermarket / filter implications
- Engineering review trigger
- One-click opportunity brief (copy / print)

The 13 application families: welding & cutting, woodworking, grinding/buffing/polishing/abrasive blasting, machining, foundry & metal melting, material transport & loadout, mixing, open surface tanks, paint operations, LVHV source capture, vehicle exhaust, push-pull systems, and specialty operations — plus equipment-level entries (e.g., CNC router, conveyor transfer point) that inherit from their family.

**Disclaimer:** This is a sales discovery guide, not an engineering design tool. VS plate numbers are series-level pointers — verify against the current ACGIH edition, and route engineering triggers to applications engineering before quoting.

## Tech stack

React + TypeScript + Vite + Tailwind CSS + shadcn/ui

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
```
