# OctoLearn: landing page

A one-screen landing page for the OctoLearn app: nav, hero, a loader animation, and two buttons
(iPhone via Expo Go, Android via a downloadable APK from GitHub Releases). Plain HTML, CSS and a little JavaScript, with **no build step**,
so Vercel can serve it as it is.

- Octagram logo (an 8-pointed star) drawn as SVG: nav, loader, favicon, iPhone icon, share image.
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

## Things to set after the first deploy

1. **iPhone button** (`index.html`, the `id="ios-link"` link). It currently opens the Expo Go page on the App Store,
   which installs Expo Go but does not open OctoLearn. To open the app itself, publish it with
   `npx eas-cli update --auto` from the app project. Expo prints a dashboard link such as
   `https://expo.dev/accounts/<account>/projects/<project>/updates/<id>`; put that link in the `href`.
   (The visitor opens it, taps *Preview* and scans the QR code with Expo Go. Check on a real iPhone that this flow works for you.)
2. **Share image** (`index.html`): change `og:image` to the full address, e.g. `https://your-site.vercel.app/og-image.png`,
   so link previews show it.
3. **New APK:** attach the new build, named exactly `OctoLearn.apk`, to a new GitHub Release (or replace the file on the latest one):
   ```bash
   gh release upload v1.0.0 OctoLearn.apk --clobber      # replace on an existing release
   gh release create v1.1.0 OctoLearn.apk --title "OctoLearn 1.1.0"   # or publish a new version
   ```
   The Android button always points at `releases/latest/download/OctoLearn.apk`, so the site needs no change.
   Update the version and size text in `index.html` and `script.js` (search for `v1.0.0` and `58.7 MB`).

## Notes

- The APK (58.7 MB, signed with a debug key: fine for demos, not for the Play Store) lives in GitHub Releases instead of git,
  so the repository stays small. This needs the repository to be **public**.
- Android browsers ask the visitor to allow installing from unknown sources the first time. The page says so under the buttons.
