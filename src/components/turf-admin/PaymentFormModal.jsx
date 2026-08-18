import React, { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

export default function PaymentFormModal({
  open,
  onClose,
  onSubmit,
  submitting
}) {

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount) return;

    onSubmit(
      parseFloat(amount),
      method,
      transactionId
    );


    setAmount("");
    setMethod("");
    setTransactionId("");
  };



  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Payment"
    >

      <form
        onSubmit={handleSubmit}
        className="
          flex
          flex-col
          gap-3
          sm:gap-4
          w-full
        "
      >


        <Input
          label="Amount (৳)"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />



        <Input
          label="Method (optional)"
          name="method"
          placeholder="bkash, nagad, cash"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />



        <Input
          label="Transaction ID (optional)"
          name="transaction_id"
          placeholder="e.g. TXN-BKASH-9981"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />



        <p
          className="
            text-xs
            leading-relaxed
            text-qt-charcoal/50
            -mt-1
            sm:-mt-2
          "
        >
          Use this to cross-check the customer's payment against their
          bKash/Nagad transaction ID.
        </p>




        <Button
          type="submit"
          variant="accent"
          fullWidth
          disabled={submitting}
          className="
            mt-1
            w-full
          "
        >
          {submitting
            ? "Saving..."
            : "Record payment"}
        </Button>


      </form>


    </Modal>
  );
}