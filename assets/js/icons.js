/* =========================================================
   BHARATTUBE VECTOR ICON SPRITES & HELPER
   ========================================================= */

const BTIcons = {
    // Official BharatTube Brand Logo
    logo: `
        <svg viewBox="0 0 160 36" width="128" height="28" fill="none" style="vertical-align:middle;">
            <rect x="2" y="4" width="40" height="28" rx="8" fill="#FF0000" />
            <path d="M19 12L28 18L19 24V12Z" fill="#FFFFFF" />
            <text x="48" y="24" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.5">Bharat<tspan fill="#FF0000">Tube</tspan></text>
        </svg>
    `,

    // Navigation Icons
    home: `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    shorts: `<svg viewBox="0 0 24 24"><path d="M17.77 10.32l-1.2-.5-1.1-.46 1.05-.53c1.78-.9 2.5-3.08 1.6-4.86-.9-1.78-3.08-2.5-4.86-1.6L6.5 5.67c-1.78.9-2.5 3.08-1.6 4.86.32.64.83 1.13 1.44 1.43l1.2.5 1.1.46-1.05.53c-1.78.9-2.5 3.08-1.6 4.86.63 1.25 1.88 1.99 3.23 1.99.55 0 1.11-.13 1.63-.39l6.76-3.3c1.78-.9 2.5-3.08 1.6-4.86-.32-.64-.83-1.13-1.44-1.43zM10 14.5v-5l4.5 2.5-4.5 2.5z"/></svg>`,
    uploadPlus: `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    subscriptions: `<svg viewBox="0 0 24 24"><path d="M20 8H4V6h16v2zm-2-6H6v2h12V2zm4 10v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-8c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 4l-6-3.27v6.53L16 16z"/></svg>`,
    profile: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,

    // Video Action Icons
    like: `<svg viewBox="0 0 24 24"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>`,
    dislike: `<svg viewBox="0 0 24 24"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.58-6.59c.37-.36.59-.86.59-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>`,
    share: `<svg viewBox="0 0 24 24"><path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11z"/></svg>`,
    download: `<svg viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`,
    superThanks: `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    verified: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
};

window.BTIcons = BTIcons;
