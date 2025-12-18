import { useEffect } from 'react';

export const useSEO = ({ title, description, keywords, image }) => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || '');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description || '';
      document.head.appendChild(meta);
    }

    // Meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || '');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords || '';
      document.head.appendChild(meta);
    }

    // Open Graph tags (para Discord, Facebook, Twitter, etc.)
    const updateMetaTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content || '');
    };

    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', window.location.href);
    
    if (image) {
      updateMetaTag('og:image', image);
    }

    // Twitter Card tags
    const updateTwitterTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content || '');
    };

    updateTwitterTag('twitter:card', 'summary_large_image');
    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    
    if (image) {
      updateTwitterTag('twitter:image', image);
    }

  }, [title, description, keywords, image]);
};