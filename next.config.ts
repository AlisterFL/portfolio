import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Politique de confidentialité d'Idle Ski Empire : page statique autonome (public/), servie sans « .html ».
      { source: "/idle-ski-empire/privacy", destination: "/idle-ski-empire/privacy.html" },
      // Page d'assistance du jeu (URL d'assistance de la fiche App Store), servie de même.
      { source: "/idle-ski-empire/support", destination: "/idle-ski-empire/support.html" },
    ];
  },
};

export default nextConfig;
