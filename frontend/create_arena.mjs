import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src', 'pages', 'dashboard', 'arena');
const customerDir = path.join(__dirname, 'src', 'pages', 'dashboard', 'customer', 'arena');

fs.mkdirSync(pagesDir, { recursive: true });
fs.mkdirSync(customerDir, { recursive: true });

const createPlaceholder = (name) => `import React from 'react';

const ${name} = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-black mb-6 uppercase tracking-tight text-text-primary">${name}</h1>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <p className="text-text-secondary font-medium">This module is under construction.</p>
      </div>
    </div>
  );
};

export default ${name};
`;

const pages = [
  'ArenaDashboard',
  'Visitors',
  'RFIDCards',
  'Activities',
  'Packages',
  'Memberships',
  'Bookings',
  'ActivityScanner',
  'ArenaBilling',
  'ArenaReports',
  'ArenaStaff',
  'ArenaSettings'
];

pages.forEach(page => {
  fs.writeFileSync(path.join(pagesDir, `${page}.jsx`), createPlaceholder(page));
});

fs.writeFileSync(path.join(customerDir, `CustomerArenaPortal.jsx`), createPlaceholder('CustomerArenaPortal'));

console.log('Arena pages created successfully.');
