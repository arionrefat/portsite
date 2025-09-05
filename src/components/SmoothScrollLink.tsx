'use client';

import React from 'react';

interface SmoothScrollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SmoothScrollLink({ 
  href, 
  children, 
  className = '', 
  onClick 
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }
    
    // Handle hash links for smooth scrolling
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Get the navbar height for offset calculation
        const navbar = document.querySelector('.top-nav') as HTMLElement;
        const navbarHeight = navbar ? navbar.offsetHeight : 60;
        
        // Use getBoundingClientRect for more accurate positioning
        const rect = targetElement.getBoundingClientRect();
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + currentScrollTop - navbarHeight - 20;
        
        // Smooth scroll to the calculated position
        window.scrollTo({
          top: Math.max(0, targetPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
        
        // Update URL hash after a small delay to ensure smooth scrolling completes
        setTimeout(() => {
          if (window.location.hash !== href) {
            window.history.replaceState(null, '', href);
          }
        }, 500);
      }
    } else {
      // For external links, navigate normally
      if (href.startsWith('http') || href.startsWith('mailto:')) {
        window.open(href, href.startsWith('mailto:') ? '_self' : '_blank');
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
