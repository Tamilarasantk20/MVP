import { CheckoutForm } from "@/components/payment/checkout-form"

export default function Page() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-md">
        <CheckoutForm />
      </div>
    </main>
  )
}
