"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Checkbox } from "@/registry/new-york-v4/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york-v4/ui/form"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/new-york-v4/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york-v4/ui/select"
import { Separator } from "@/registry/new-york-v4/ui/separator"

const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "in", label: "India" },
  { value: "de", label: "Germany" },
]

const checkoutSchema = z
  .object({
    method: z.enum(["card", "paypal"]),
    name: z.string().min(2, "Enter the name on your payment method."),
    email: z.string().email("Enter a valid email address."),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvc: z.string().optional(),
    country: z.string().min(1, "Select a country."),
    saveMethod: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.method !== "card") {
      return
    }

    if (!/^\d{16}$/.test(data.cardNumber?.replace(/\s/g, "") ?? "")) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid 16-digit card number.",
        path: ["cardNumber"],
      })
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiry ?? "")) {
      ctx.addIssue({
        code: "custom",
        message: "Use MM/YY.",
        path: ["expiry"],
      })
    }

    if (!/^\d{3,4}$/.test(data.cvc ?? "")) {
      ctx.addIssue({
        code: "custom",
        message: "Enter a valid CVC.",
        path: ["cvc"],
      })
    }
  })

type CheckoutValues = z.infer<typeof checkoutSchema>

export function CheckoutForm() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">(
    "idle"
  )

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      method: "card",
      name: "",
      email: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
      country: "",
      saveMethod: false,
    },
  })

  const method = form.watch("method")

  // Demo-only: simulates a payment provider round trip. Swap for a real
  // payment provider call (e.g. Stripe PaymentIntent confirmation) before
  // shipping this to production.
  async function onSubmit(values: CheckoutValues) {
    setStatus("submitting")
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setStatus("success")
  }

  if (status === "success") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment successful</CardTitle>
          <CardDescription>
            A receipt has been sent to {form.getValues("email")}.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              form.reset()
              setStatus("idle")
            }}
          >
            Make another payment
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>
          Enter your payment details below to complete your purchase.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="grid grid-cols-2 gap-3"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <Label
                        htmlFor="method-card"
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md border p-3",
                          field.value === "card" && "border-primary"
                        )}
                      >
                        <RadioGroupItem value="card" id="method-card" />
                        Card
                      </Label>
                      <Label
                        htmlFor="method-paypal"
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-md border p-3",
                          field.value === "paypal" && "border-primary"
                        )}
                      >
                        <RadioGroupItem value="paypal" id="method-paypal" />
                        PayPal
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on account</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jane@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll send your receipt here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {method === "card" && (
              <>
                <Separator />
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card number</FormLabel>
                        <FormControl>
                          <Input
                            inputMode="numeric"
                            placeholder="4242 4242 4242 4242"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input
                              inputMode="numeric"
                              placeholder="123"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveMethod"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Save this payment method for next time
                  </FormLabel>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "Processing..." : "Pay now"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
