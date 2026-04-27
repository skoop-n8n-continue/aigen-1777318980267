const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update header
html = html.replace(
    /<div class="header-nav" id="header-nav" style="display: none;">/,
    `<div class="header-brand-info" id="header-brand-info" style="display: none;">
            <h2 id="header-brand-title" class="header-brand-title"></h2>
            <p id="header-brand-subtitle" class="header-brand-subtitle"></p>
        </div>
        <div class="header-nav" id="header-nav" style="display: none;">`
);

html = html.replace(
    /<\/header>/,
    `    <div class="header-divider" id="header-divider"></div>
    </header>`
);

// Update modal
html = html.replace(
    /<\/div>\s*<div class="product-details">/,
    `</div>
                <div class="modal-theme-divider" id="modal-theme-divider"></div>
                <div class="product-details">`
);

fs.writeFileSync('index.html', html);
