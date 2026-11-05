# OctoLearn: landing page

A one-screen landing page for the OctoLearn app: nav, hero, a loader animation, and one button
(a downloadable Android APK from GitHub Releases). Plain HTML, CSS and a little JavaScript, with **no build step**,
so Vercel can serve it as it is.

- Octagram logo (an 8-pointed star) drawn as SVG: nav, loader, favicon, home-screen icon, share image.
- Loader: the octagram draws itself while the page and fonts load (about 1.2 s minimum, never longer than 6 s).
- Mobile first: buttons stack on phones; light and dark mode follow the phone; reduced-motion is respected.
- Mongolian by default, with an MN / EN switch in the nav (remembered in the browser).
- Security headers and a strict Content-Security-Policy are set in `vercel.json`.

```
index.html        the page
styles.css        all styling
script.js         loader + language switch
boot.js           marks the page "JS on" before first paint
noscript.css      hides the loader when JavaScript is off
vercel.json       security headers + Content-Security-Policy
favicon.svg, apple-touch-icon.png, og-image.png
```

## Run it locally

```bash
npx serve .          # or: python3 -m http.server 3000
```

## Publish on Vercel

1. Put this folder in its own Git repo and push it to GitHub:
   ```bash
   git init -b main && git add . && git commit -m "feat: OctoLearn landing page"
   gh repo create octolearn-web --public --source=. --push
   ```
2. On vercel.com choose **Add New → Project**, import the repo. Framework preset **Other**; leave Build Command and
   Output Directory empty. Deploy.

(Or, without GitHub: `npx vercel --prod` from this folder.)

## Publishing a new APK

Attach the new build, named exactly `OctoLearn.apk`, to a new GitHub Release:

```bash
gh release create v1.0.2 OctoLearn.apk --title "OctoLearn 1.0.2"
```

The Android button always points at `releases/latest/download/OctoLearn.apk`, so its link never changes.
Update the version and size text in `index.html` and `script.js` (search for `APK ·`).

## Notes

- The APK (signed with a debug key: fine for demos, not for the Play Store) lives in GitHub Releases instead of git,
  so the repository stays small. This needs the repository to be **public**.
- iPhone is not offered: the App Store's Expo Go stops at SDK 54 and the app uses SDK 58.
- Android browsers ask the visitor to allow installing from unknown sources the first time. The page says so under the buttons.
