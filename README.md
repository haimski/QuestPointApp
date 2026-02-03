## QuestPoint — Gaming Console E‑commerce + Gaming Vault

QuestPoint is a premium, dark/red themed gaming console storefront with a “Gaming Vault” blog.

Built upon **Gatsby** (React) with **Tailwind CSS** and a **first‑party cart** that checks out via **Stripe Checkout**. Optimized for **Vercel** (Gatsby Functions in `src/api`).

### Features
- **Store**: product listing with filtering + product detail pages
- **Cart**: localStorage‑persisted cart, quantity/edit/remove, header item counter
- **Checkout**: Stripe Checkout demo flow (test mode)
- **Gaming Vault**: Markdown blog with article list + next/previous navigation
- **Legal/Company**: About, Contact, Privacy, Terms

### Tech stack
- **Gatsby v5+**
- **React**
- **Tailwind CSS**
- **Stripe** (`stripe` server SDK) via Gatsby Functions (`src/api/create-checkout-session.js`)
- **Vercel** headers/config in `vercel.json`

### Run locally
Install and start:

```bash
npm install
npm run develop
```

Open `http://localhost:8000`.

### Configure Stripe locally (required for checkout)
Copy env template and set your key:

```bash
cp .env.development.example .env.development
```

Edit `.env.development`:

```env
STRIPE_SECRET_KEY=sk_test_...
SITE_URL=http://localhost:8000
```

Restart Gatsby after changing env vars:

```bash
npm run clean
npm run develop
```

### Deploy to Vercel (production)
In **Vercel → Project → Settings → Environment Variables**, set:
- `STRIPE_SECRET_KEY` (use `sk_live_...` for production)
- `SITE_URL` (e.g. `https://your-domain.com`)

Then redeploy.

