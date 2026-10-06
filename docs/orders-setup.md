# COD orders: Google Sheets and email setup

COD orders are stored in the Google spreadsheet's `Orders` tab and emailed to the
same inbox as the existing inquiry form (`talibffdc@gmail.com` by default).
Order totals are recalculated on the server from `data/shop-catalog.json`; values
sent by the browser are not used for pricing.

## 1. Update catalog prices and fees

Edit `data/shop-catalog.json` before accepting real orders:

- Change each variant's `price` (INR).
- `fees.indiaShipping` is currently `0` (free).
- `fees.indiaCodFee` is currently `49`.
- `fees.internationalShipping` is currently `3000`.

International orders are not accepted yet because online payment has not been
enabled. The site displays the international shipping fee and keeps checkout
disabled for those destinations. When Razorpay is connected, the payment flow
can use that fee and omit the COD fee for online payments.

To add an item, add a product object to `products` with a unique `slug`, image
path, and at least one variant. Put its image in `public/images/products/` and
set `image` to its public path, for example `/images/products/gulab.jpg`.
The existing Gulab, Mitti, Shamama, and Hina photos already use files in
`public/images/`; for the remaining products, add photos there and fill each
empty `image` field with its exact public path.

## 2. Add the Apps Script to the spreadsheet

1. Open the provided spreadsheet and choose **Extensions → Apps Script**.
2. Replace the editor contents with `scripts/google-sheets-orders.gs`, then save.
3. In Apps Script, open **Project Settings → Script Properties** and add:
   - Property: `ORDER_WEBHOOK_SECRET`
   - Value: a private random value generated for this site. For example, run
     `openssl rand -hex 32` in a terminal. Do not put this value in the Apps
     Script source, spreadsheet cells, or client-side code.
4. Run `setupOrdersSheet` once from the Apps Script editor and authorize access.
   This creates and formats a separate `Orders` tab; it does not overwrite the
   existing sheet tab.
5. Choose **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Deploy, authorize if prompted, and copy the Web app URL ending in `/exec`.

The endpoint must be public for the store server to call it, but it rejects
requests without the matching secret. Keep the secret private and restrict
spreadsheet access to trusted staff because it contains customer personal data.
If the Apps Script deployment is changed, update the URL in the site environment.
Before testing a real order, open the `/exec` URL in a private/incognito browser
window. It should show JSON with `"status":"ready"`. If it redirects to a Google
sign-in page, deployment access is not public yet. If it says
`"missing_secret"`, recheck Script Properties. If it says
`"spreadsheet_unavailable"`, run `setupOrdersSheet` and authorize spreadsheet
access again.

If the production checkout reports HTTP 404, copy the current **Web app** URL
from Apps Script → Deploy → Manage deployments. Use the URL ending in `/exec`
(not `/dev`, a library URL, or a URL from an older deployment), update
`GOOGLE_SHEETS_ORDERS_URL` for the Production environment in Vercel, then trigger
a new Vercel deployment. Open that exact URL in a private browser window and
confirm it returns the `ready` JSON before retrying checkout.

## 3. Configure the website server

Add these server-only values to local `.env.local` and the hosting provider's
server environment settings (for example, Vercel). Restart/redeploy after
changing them:

```dotenv
GOOGLE_SHEETS_ORDERS_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
GOOGLE_SHEETS_ORDERS_SECRET=THE_SAME_PRIVATE_RANDOM_VALUE_AS_SCRIPT_PROPERTY
ORDER_NOTIFICATION_EMAIL=talibffdc@gmail.com
```

`RESEND_API_KEY` is already used by the inquiry endpoint and is also required
for order email notifications. Do not prefix any of these values with `NEXT_PUBLIC_`.
To send email to another inbox, change `ORDER_NOTIFICATION_EMAIL`; the contact
form recipient is currently set separately in `app/api/inquiry/route.ts`.

## 4. Order and dispatch tracking

Each order is appended to `Orders` with a unique order ID, timestamp, customer
and address, line items, item subtotal, free India shipping, ₹49 COD fee, total
to collect, payment status, and initial order/dispatch statuses.

Update these columns in the sheet as the order moves through fulfilment:

- **Order Status:** New → Confirmed → Packed → Dispatched → Delivered (or Cancelled)
- **Dispatch Status:** Pending → Packed → Dispatched → Delivered (or Returned)
- **Courier**, **Tracking Number**, and **Dispatch Date**
- **Internal Notes** for customer follow-up or dispatch details

An order is confirmed on the site only after the sheet confirms it was saved.
If the email provider fails after that, the sheet remains authoritative and the
confirmation page warns that the notification email needs attention.

## Payment state

The live checkout currently accepts India COD only. The ₹49 COD fee is collected
with the order; India shipping is free. International shipping is configured at
₹3,000, but international orders stay disabled until online payment is connected.
No card/UPI payment is claimed or processed by this COD flow.
