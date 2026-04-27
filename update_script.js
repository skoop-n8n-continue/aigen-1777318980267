const fs = require('fs');

let script = fs.readFileSync('script.js', 'utf8');

// DOM Elements addition
script = script.replace(
    /const headerNav = document.getElementById\('header-nav'\);/,
    `const headerNav = document.getElementById('header-nav');
const headerBrandInfo = document.getElementById('header-brand-info');
const headerBrandTitle = document.getElementById('header-brand-title');
const headerBrandSubtitle = document.getElementById('header-brand-subtitle');
const headerDivider = document.getElementById('header-divider');`
);

// In showBrandProducts
script = script.replace(
    /brandsScreen\.classList\.remove\('active'\);\s*productsScreen\.classList\.add\('active'\);\s*headerNav\.style\.display = 'block';/,
    `brandsScreen.classList.remove('active');
    productsScreen.classList.add('active');
    headerNav.style.display = 'block';
    
    // Set theme color
    const root = document.documentElement;
    const brandColor = getComputedStyle(root).getPropertyValue('--brand-' + brandId).trim() || '#00b7af';
    root.style.setProperty('--accent-color', brandColor);
    
    // Update header info
    headerBrandInfo.style.display = 'block';
    headerDivider.style.display = 'block';
    headerBrandTitle.textContent = currentBrand.name + " BRAND";
    headerBrandSubtitle.textContent = "Premium Quality";`
);

// Update goHome to revert
script = script.replace(
    /productsScreen\.classList\.remove\('active'\);\s*brandsScreen\.classList\.add\('active'\);\s*headerNav\.style\.display = 'none';/,
    `productsScreen.classList.remove('active');
        brandsScreen.classList.add('active');
        headerNav.style.display = 'none';
        headerBrandInfo.style.display = 'none';
        headerDivider.style.display = 'none';
        
        // Reset theme color
        document.documentElement.style.setProperty('--accent-color', '#00b7af');`
);

fs.writeFileSync('script.js', script);
