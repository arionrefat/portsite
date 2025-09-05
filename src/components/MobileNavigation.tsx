'use client';

import React, { useState } from 'react';
import SmoothScrollLink from './SmoothScrollLink';
import { SocialIcon } from './SocialIcons';

interface MobileNavigationProps {
  navItems: Array<{ label: string; href: string }>;
  socialLinks?: Array<{ label: string; href: string }>;
  siteName: string;
}

export default function MobileNavigation({ navItems, socialLinks = [], siteName }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="mobile-nav-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <div className={`mobile-nav-menu ${isOpen ? 'open' : ''}`}>
        <nav className="nav-links">
          {navItems.map((item, i) => (
            <SmoothScrollLink 
              key={item.href} 
              href={item.href} 
              className={i === 0 ? "active" : ""}
              onClick={closeMenu}
            >
              {item.label.toLowerCase()}
            </SmoothScrollLink>
          ))}
        </nav>
        
        {socialLinks.length > 0 && (
          <div className="mobile-social">
            {socialLinks.map(link => (
              <SocialIcon 
                key={link.href} 
                platform={link.label} 
                href={link.href} 
                className="social-dot" 
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
