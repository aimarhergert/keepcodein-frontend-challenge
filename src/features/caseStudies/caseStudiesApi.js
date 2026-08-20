const seed = [
  { id: "cs-1", title: "E-commerce Storefront Redesign", category: "Web", summary: "Rebuilt a product catalogue with headless CMS, cutting time-to-publish from days to minutes.", year: 2023 },
  { id: "cs-2", title: "Ride-Sharing Mobile App", category: "Mobile", summary: "Cross-platform rider app handling live geolocation, payments and driver matching.", year: 2022 },
  { id: "cs-3", title: "ML Fraud Detection Pipeline", category: "AI", summary: "Trained and deployed a fraud model that flags anomalies in under 50ms per transaction.", year: 2024 },
  { id: "cs-4", title: "DeFi Lending Protocol", category: "Blockchain", summary: "Smart-contract lending platform with audited pools and transparent on-chain bookkeeping.", year: 2023 },
  { id: "cs-5", title: "Saas Analytics Dashboard", category: "Web", summary: "Real-time analytics UI with websocket streams, role-based access and export tooling.", year: 2022 },
  { id: "cs-6", title: "Healthcare Booking App", category: "Mobile", summary: "Appointment scheduling with insurance eligibility checks and instant notifications.", year: 2021 },
  { id: "cs-7", title: "Customer Support Chatbot", category: "AI", summary: "Context-aware chatbot trained on support history, resolving 70% of tickets unaided.", year: 2024 },
  { id: "cs-8", title: "NFT Marketplace & Wallet", category: "Blockchain", summary: "Gas-optimized marketplace with embedded wallet and fiat on-ramp integration.", year: 2022 },
];

export function fetchCaseStudies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error("Network failed"));
      } else {
        resolve(seed);
      }
    }, 800);
  });
}
