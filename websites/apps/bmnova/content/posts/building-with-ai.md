---
title: "Building AI-Native Apps in 2025"
date: "2025-01-15"
summary: "What we've learned after shipping two AI-powered products — and what we'd do differently."
tags: ["AI", "Flutter", "Product"]
---

## The shift is real

A year ago, "AI-native" meant sprinkling a chatbot into your app. Today it means rethinking the entire product surface from the ground up — how data flows, how users interact, and how the UI itself can respond to intelligence.

We've been building in this space since day one with [intyx.ai](https://intyx.ai) and the `dynamic_intyx` Flutter package. Here's what we've learned.

## Start with the data, not the model

Every AI feature we've shipped started with a clear answer to: *what data does the model need to be useful?*

For intyx.ai, the answer was structured tabular data — CSV and JSON. Once we had clean ingestion, the AI layer almost wrote itself.

## The MCP protocol changes everything for mobile

The [Model Context Protocol](https://modelcontextprotocol.io) lets AI agents call tools and read context from your app at runtime. For Flutter, this unlocks something genuinely new: an agent that can render widgets, update state, and guide users — without you hardcoding any of it.

That's the core idea behind `dynamic_intyx`. The Flutter widget tree becomes a surface the AI can control.

## Ship small, learn fast

Both products started as weekend experiments. The version we shipped publicly was iteration 8 or 9. Don't wait for perfect — get real users on it and let the feedback shape the roadmap.

---

*Questions? Reach us at [hello@bmnova.com](mailto:hello@bmnova.com).*
