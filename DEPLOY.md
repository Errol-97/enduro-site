# Going live on endurosolutionstrade.com

Everything local is ready: `main` branch, 2 commits, `CNAME` set, remote pointed at
`git@github.com:Errol-97/enduro-site.git`. Your SSH key to GitHub works.

Four steps. About 10 minutes of work, then up to an hour of waiting for DNS and the TLS
certificate.

---

## 1. Create the GitHub repo

Your `gh` CLI token has expired, so either:

**Option A — web (fastest)**

Go to <https://github.com/new>, name it exactly **`enduro-site`**, set it **Public**, and do
**not** add a README, .gitignore or licence (the repo already has commits). Click *Create*.

**Option B — CLI**

```bash
gh auth login -h github.com        # re-authenticate, then:
cd ~/enduro-site
gh repo create enduro-site --public --source=. --push
```

If you use Option B, skip step 2.

---

## 2. Push

```bash
cd ~/enduro-site
git push -u origin main
```

---

## 3. Turn on GitHub Pages

In the repo: **Settings → Pages**

- **Source:** Deploy from a branch
- **Branch:** `main`, folder `/ (root)` → **Save**

The *Custom domain* field should auto-populate with `endurosolutionstrade.com` from the
committed `CNAME` file. If it doesn't, type it in and save.

It'll warn that DNS isn't configured yet. That's expected — step 4 fixes it.

Within a minute or two the site will be live at
`https://errol-97.github.io/enduro-site/` so you can check it before DNS switches over.

---

## 4. Point the domain at GitHub

The domain is registered at **Squarespace Domains** and currently points at Squarespace's own
servers. You need to replace those records.

Go to <https://account.squarespace.com/> → **Domains** → **endurosolutionstrade.com** →
**DNS Settings**.

### Remove these existing records

Squarespace pre-configured the domain for a Squarespace site:

| Type  | Host  | Current value              |
|-------|-------|----------------------------|
| A     | `@`   | `198.49.23.144`            |
| A     | `@`   | `198.49.23.145`            |
| A     | `@`   | `198.185.159.144`          |
| A     | `@`   | `198.185.159.145`          |
| CNAME | `www` | `ext-sq.squarespace.com`   |

> If Squarespace won't let you delete these, the domain is still "connected" to a Squarespace
> site. Look for a *Disconnect* / *Use external DNS* / *Advanced settings* option first.

### Add these instead

| Type  | Host  | Value               | TTL  |
|-------|-------|---------------------|------|
| A     | `@`   | `185.199.108.153`   | 3600 |
| A     | `@`   | `185.199.109.153`   | 3600 |
| A     | `@`   | `185.199.110.153`   | 3600 |
| A     | `@`   | `185.199.111.153`   | 3600 |
| CNAME | `www` | `errol-97.github.io.` | 3600 |

All four A records are required — they're GitHub's four Pages servers.

---

## 5. Enable HTTPS

Wait for DNS to propagate (usually 15–60 minutes; the domain is brand new so there's no stale
cache to clear). Check progress:

```bash
dig +short endurosolutionstrade.com A
# You want to see the four 185.199.10x.153 addresses
```

Once those appear, go back to **Settings → Pages** and tick **Enforce HTTPS**. If the box is
greyed out, GitHub is still issuing the certificate — check back in half an hour.

**Do this well before September 1.** The certificate can take up to an hour and you don't want
to be sending outreach to a browser security warning.

---

## Verify it's actually working

```bash
curl -sI https://endurosolutionstrade.com | head -1          # expect HTTP/2 200
curl -sI https://www.endurosolutionstrade.com | head -1      # expect 200 or 301
curl -s https://endurosolutionstrade.com/laredo.html | grep -c "Pathways for Trade"
```

Then in a browser:

- [ ] Homepage loads over HTTPS with no certificate warning
- [ ] Padlock shows, no mixed-content warning in the console
- [ ] `/laredo.html` loads and looks right on your phone
- [ ] Click an email link — it opens your mail client with the subject pre-filled
- [ ] Download the vCard and confirm the contact saves correctly
- [ ] **Scan the QR code** (`assets/qr-laredo.svg`) with your phone camera
- [ ] Paste `https://endurosolutionstrade.com` into a LinkedIn message box and confirm the
      preview card renders (or use <https://www.linkedin.com/post-inspector/>)

---

## Making changes later

```bash
cd ~/enduro-site
# edit the .html files
npm run build          # REQUIRED if you added any Tailwind classes
git add -A && git commit -m "what changed"
git push
```

Pages redeploys automatically in about a minute.

To preview before pushing:

```bash
npm run serve          # http://localhost:8080
```

---

## The old Trilink site

`trilinkglobaltrade.com` and the `trilink-landing` repo are untouched and still live. Once
this site is up, you can point that domain here by replacing its `CNAME` contents and DNS —
or just leave it running until you're ready.
