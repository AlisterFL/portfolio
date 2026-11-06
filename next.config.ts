import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Politique de confidentialité d'Idle Ski Empire : page statique autonome (public/), servie sans « .html ».
      { source: "/idle-ski-empire/privacy", destination: "/idle-ski-empire/privacy.html" },
    ];
  },
};

export default nextConfig;
