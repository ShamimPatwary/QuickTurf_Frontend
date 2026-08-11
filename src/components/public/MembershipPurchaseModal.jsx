import React, { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { initiateMembershipPayment } from "../../api/paymentApi";

export default function MembershipPurchaseModal({
  open,
  onClose,
  membership,
  turfId,
  onSubmit,
  submitting,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    amount_paid: "",
    transaction_id: "",
  });

  const [step, setStep] = useState("form");
  const [payingOnline, setPayingOnline] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!form.name || !form.phone) return;

    setStep("payment");
  };


  const handlePayOnline = async () => {
    setPayingOnline(true);
    setError("");

    try {
      const res = await initiateMembershipPayment({
        turf_id: turfId,
        membership_id: membership.id,
        customer_name: form.name,
        customer_email: form.email || null,
        customer_phone: form.phone,
      });


      await onSubmit({
        ...form,
        amount_paid: membership.price,
        transaction_id: "SSLCommerz-pending",
      });


      window.location.href = res.data.gateway_url;

    } catch (err) {
      setError("Could not initiate online payment. Try manual payment.");
      setPayingOnline(false);
    }
  };


  const handlePayManual = async () => {

    if (!form.amount_paid || !form.transaction_id) {
      setStep("manual");
      return;
    }

    await onSubmit({
      ...form,
      amount_paid: parseFloat(form.amount_paid),
    });
  };


  const handleClose = () => {

    setStep("form");

    setForm({
      name:"",
      email:"",
      phone:"",
      amount_paid:"",
      transaction_id:"",
    });

    setError("");

    onClose();
  };


  if (!membership) return null;


  return (
    <Modal 
      open={open} 
      onClose={handleClose} 
      title={`Buy ${membership.name}`}
    >

      <div className="mb-4 rounded-lg bg-qt-mist px-4 py-3 text-sm">

        <p className="text-qt-charcoal/70">

          {membership.duration_days} days ·

          {membership.discount_percentage > 0 &&
            `${membership.discount_percentage}% off every booking · `}

          <span className="font-semibold text-qt-green">
            ৳{membership.price}
          </span>

        </p>

      </div>


      {error && (
        <div className="mb-3 rounded-lg bg-qt-red/10 px-3 py-2 text-sm text-qt-red-dark">
          {error}
        </div>
      )}



      {(step==="form" || step==="manual") && (

        <form 
          onSubmit={handleSubmitForm}
          className="flex flex-col gap-4"
        >

          <Input
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />


          <Input
            label="Email (optional)"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />


          <Input
            label="Phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />


          {step==="manual" && (

            <>
              <Input
                label="Amount paid"
                name="amount_paid"
                type="number"
                value={form.amount_paid}
                onChange={handleChange}
              />


              <Input
                label="Transaction ID"
                name="transaction_id"
                value={form.transaction_id}
                onChange={handleChange}
              />


              <Button
                type="button"
                variant="accent"
                fullWidth
                onClick={handlePayManual}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit manual payment"}
              </Button>

            </>
          )}



          {step==="form" && (

            <Button
              type="submit"
              variant="accent"
              fullWidth
            >
              Continue to payment
            </Button>

          )}

        </form>

      )}



      {step==="payment" && (

        <div className="flex flex-col gap-3">


          {/*<button
            onClick={handlePayOnline}
            disabled={payingOnline}
            className="rounded-xl bg-qt-navy p-4 text-left text-white"
          >

            💳 Pay via SSLCommerz

            {payingOnline && (
              <span> Redirecting...</span>
            )}

          </button> */}



          <button
            onClick={()=>setStep("manual")}
            className="rounded-xl border p-4 text-left"
          >

            🏦 Buy Membership

          </button>



          <button
            onClick={()=>setStep("form")}
            className="text-xs"
          >

            ← Back

          </button>


        </div>

      )}

    </Modal>
  );
}