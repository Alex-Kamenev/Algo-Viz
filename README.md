# Algorithm visualizer

An Ionic/React learning project with an animated bubble sort and sorted-array
exploration screen. Enter 0 to 25 elements, generate an array, then animate bubble
sort. Generation and count editing are locked during sorting. Empty input means
zero. The Search screen generates sorted data; interactive searching remains future
work.

Requires Node.js 24.15+ and npm. Run `npm ci`, `npm test`, then `npm start`.
`npm run build` checks TypeScript and produces a static `build/` directory;
`npm run preview` serves it locally. Vite and Vitest replace the retired Create React
App 4 toolchain. Browser zoom is enabled. No active offline service worker was
configured in the original app; unused CRA PWA starter files were removed.

Ionic 8 retains the existing React Router 5 routing API. Capacitor 8 metadata remains
for future native builds; no Android/iOS project build or Firebase deployment was
performed in this maintenance pass. Firebase's existing `build/` hosting directory
is preserved. A static host must rewrite application routes to `index.html`.
