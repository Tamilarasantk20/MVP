# Payment MVP

A minimal checkout/payment form built with [shadcn/ui](https://ui.shadcn.com) components on Next.js.

This app started as a fork of the shadcn/ui component registry, trimmed down to just the pieces needed for a payment flow: `button`, `card`, `checkbox`, `form`, `input`, `label`, `radio-group`, `select`, and `separator` (`apps/v4/registry/new-york-v4/ui`). The feature itself lives in `apps/v4/components/payment/checkout-form.tsx`.

## Development

```bash
pnpm install
pnpm dev
```

The app runs at http://localhost:4000.

## Note

The checkout form validates input and simulates a payment — no live payment provider is wired up. Connect it to a real processor (e.g. Stripe) before taking this to production.

## License

Licensed under the [MIT license](./LICENSE.md).
