# Static Assets Required

The following assets are referenced in the codebase but need to be created:

1. **favicon.ico** - Browser favicon (16x16 or 32x32)
   - Can be generated from logo.svg using an online converter
   - Or use: `convert logo.svg -resize 32x32 favicon.ico` (ImageMagick)

2. **apple-touch-icon.png** - iOS home screen icon (180x180)
   - Can be generated from logo.svg
   - Or use: `convert logo.svg -resize 180x180 apple-touch-icon.png` (ImageMagick)

3. **og-image.png** - Open Graph image for social sharing (1200x630)
   - Should include brand name "Indeed Flex Career Hub" and tagline
   - Can be created using design tools or generated from a template

4. **logo.png** - Organization schema logo (512x512)
   - Can be generated from logo.svg
   - Or use: `convert logo.svg -resize 512x512 logo.png` (ImageMagick)

**Note:** logo.svg has been copied to public/ for reference. All other assets should be generated from this source file.

