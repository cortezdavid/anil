import { useEffect } from "react";

export const useSEO = ({ title, description, keywords, noindex = false }) => {
  useEffect(() => {
    // Título
    if (title) document.title = title;

    // Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }

    // Keywords
    if (keywords) {
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement("meta");
        metaKey.name = "keywords";
        document.head.appendChild(metaKey);
      }
      metaKey.content = keywords;
    }

    // Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = noindex ? "noindex, nofollow" : "index, follow";
  }, [title, description, keywords, noindex]);
};
