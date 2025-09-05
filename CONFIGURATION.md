# Portfolio Configuration Guide

This file contains all the configurable variables for the portfolio website. You can easily customize this for any developer by modifying the values in `public/portfolio.config.json`.

## Key Configuration Sections

### 1. Site Configuration (`site`)
- `title`: The main title of the portfolio website
- `description`: SEO description for the site
- `email`: Contact email (used in footer and contact section)
- `tagline`: Short description/tagline (used in footer)
- `theme`: Color theme configuration

### 2. Navigation (`nav`)
- `items[]`: Array of navigation menu items
  - `label`: Display text for nav item
  - `href`: Link destination (use # for sections)

### 3. Hero Section (`hero`)
- `name`: Full name of the person
- `role`: Job title/role
- `summary`: Brief description paragraph
- `currentEmployer`: Current company name (used in status pill)
- `location`: Current location
- `actions[]`: Call-to-action buttons
- `social[]`: Social media links

### 4. Sections (`sections`)
Support for different section types:
- `experience`: Work experience entries
- `projects`: Portfolio projects
- `about`: About section with body text
- `skills`: Skill categories and items
- `contact`: Contact form/information

## How to Customize for Another Developer

1. **Personal Information**: Update `site.title`, `hero.name`, `hero.role`, `site.email`
2. **Current Job**: Update `hero.currentEmployer` and `hero.summary`
3. **Social Links**: Update `hero.social[]` array with new URLs
4. **Experience**: Replace entries in the experience section
5. **Projects**: Update project entries with new data
6. **Skills**: Modify skill categories and items
7. **Contact**: Update contact information

## Example Quick Customization

```json
{
  "site": {
    "title": "John Doe — Developer",
    "email": "john@example.com",
    "tagline": "Frontend developer and UI/UX designer"
  },
  "hero": {
    "name": "John Doe",
    "role": "Frontend Developer",
    "currentEmployer": "Tech Company Inc",
    "summary": "I create beautiful and functional web applications..."
  }
}
```

All hardcoded values have been removed and are now configurable through this JSON file!
