# Emma Gardner Portfolio - Deployment Guide

This portfolio website is ready for deployment to Netlify with multiple content management options.

## 🚀 Quick Netlify Deployment

1. **Zip the entire project folder**
2. **Go to Netlify.com** and create a new site
3. **Drag & drop the zip file** to deploy instantly
4. **Done!** Your site will be live with placeholder content

## 📝 Content Management Options

### Option 1: Simple Admin (Recommended for Quick Setup)
- **Access**: Visit `/admin-simple.html` on your live site
- **Features**: Add artworks, blog posts, manage settings
- **Data Storage**: Browser localStorage (export data when ready)
- **Workflow**: Use simple admin → Export data → Replace files → Redeploy

### Option 2: File-Based Content Management
Manually edit these files in `src/_data/`:
- `artworks.json` - Your artwork portfolio
- `posts.json` - Blog posts
- `site.json` - Site settings (artist name, social links)

### Option 3: Backend System (Advanced)
For dynamic content management, the included backend system can be deployed separately.

## 📁 Important Files for Netlify

- `netlify.toml` - Netlify configuration
- `package.json` - Build settings
- `_site/` - Generated static files (auto-created)
- `admin/` - Decap CMS setup (optional)

## 🔧 Build Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `_site`
- **Node Version**: 18

## 📱 Features Included

✅ **Responsive Design** - Works on all devices
✅ **Portfolio Gallery** - 3-column artwork display
✅ **Blog System** - Built-in blog functionality
✅ **Admin Panel** - Simple content management
✅ **SEO Optimized** - Meta tags and structured data
✅ **Fast Loading** - Optimized static site

## 🎨 Customization

### Change Artist Info
Edit `src/_data/site.json`:
```json
{
  "artist": "Your Name",
  "subtitle": "Your Tagline",
  "currency": "USD"
}
```

### Add Artworks
Edit `src/_data/artworks.json` or use the simple admin panel.

### Styling
Modify `src/styles.css` for design changes.

## 🔄 Content Update Workflow

1. **Add content** via simple admin panel
2. **Export data** from admin panel
3. **Replace** the corresponding JSON files in `src/_data/`
4. **Redeploy** to Netlify (drag & drop new zip)

## 🎯 Go Live Checklist

- [ ] Update artist name in `src/_data/site.json`
- [ ] Add real social media links
- [ ] Replace placeholder images with actual artwork
- [ ] Test all navigation links
- [ ] Check mobile responsiveness
- [ ] Set up custom domain (optional)

## 📞 Support

The site includes placeholder content that will display beautifully even before adding your own content. Everything is ready to go live immediately!

## 🔗 Key URLs After Deployment

- **Portfolio**: `/` (homepage)
- **About**: `/about/`
- **Blog**: `/pages/blog/`
- **Admin**: `/admin-simple.html`
- **Original Paintings**: `/portfolio/originals/`

Your site is now ready for the world! 🌟