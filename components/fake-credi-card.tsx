import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

type Props = {
  onSuccess?: (paymentInfo: { method: string; last4: string }) => void;
  disabled?: boolean;
};

// A small helper to format card number as XXXX XXXX XXXX XXXX
const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();
};

const validateCard = (
  cardNumber: string,
  name: string,
  exp: string,
  cvv: string
) => {
  const clean = cardNumber.replace(/\s/g, "");
  if (clean.length !== 16) return "Card number must be 16 digits.";
  if (name.trim().length < 3) return "Name is too short.";
  if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(exp))
    return "Expiry must be in MM/YY format.";
  if (!/^[0-9]{3,4}$/.test(cvv)) return "CVV must be 3 or 4 digits.";
  return null;
};

export default function FakeCreditCard({ onSuccess, disabled }: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    const err = validateCard(cardNumber, name, expiry, cvv);
    if (err) {
      toast.error(err);
      return;
    }

    startTransition(async () => {
      // Simulate a small network delay
      await new Promise((r) => setTimeout(r, 650));

      // Fake 'processing' logic. In a real app you'd call your payment API.
      const clean = cardNumber.replace(/\s/g, "");
      const last4 = clean.slice(-4);

      toast.success("Payment simulated — Authorized ✅");

      onSuccess?.({ method: "Credit Card (Fake)", last4 });
    });
  };

  return (
    <Card className="w-full mb-4">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-3">
          Pay with Credit Card (Demo)
        </h3>

        {/* Card preview */}
        <div className="rounded-xl p-4 mb-4 shadow-sm bg-gradient-to-r from-white to-slate-50">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm opacity-70">Demo Bank</div>
            <div className="text-sm opacity-70">VISA</div>
          </div>
          <div className="text-xl tracking-widest font-mono mb-2">
            {cardNumber || "•••• •••• •••• ••••"}
          </div>
          <div className="flex justify-between text-sm opacity-80">
            <div>{name || "CARDHOLDER NAME"}</div>
            <div>{expiry || "MM/YY"}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <label className="text-sm">Card number</label>
          <input
            className="input input-bordered w-full p-2 rounded-md"
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            disabled={disabled || isPending}
          />

          <label className="text-sm">Cardholder name</label>
          <input
            className="input input-bordered w-full p-2 rounded-md"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={disabled || isPending}
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm">Expiry (MM/YY)</label>
              <input
                className="input input-bordered w-full p-2 rounded-md"
                placeholder="08/27"
                value={expiry}
                onChange={(e) => {
                  // Auto-insert slash
                  const raw = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                  if (raw.length >= 3)
                    setExpiry(raw.slice(0, 2) + "/" + raw.slice(2));
                  else setExpiry(raw);
                }}
                disabled={disabled || isPending}
              />
            </div>
            <div>
              <label className="text-sm">CVV</label>
              <input
                className="input input-bordered w-full p-2 rounded-md"
                inputMode="numeric"
                placeholder="123"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                disabled={disabled || isPending}
              />
            </div>
          </div>

          <div className="pt-3">
            <Button
              onClick={handleSubmit}
              disabled={disabled || isPending}
              className="w-full"
            >
              {isPending ? "Paying..." : "Pay Now"}
            </Button>
            <p className="text-xs mt-2 opacity-70">
              This is a demo payment form. No real charges will be made.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
