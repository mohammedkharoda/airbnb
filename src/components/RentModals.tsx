"use client";
import React from "react";
import useRentModal from "../hooks/useRentModal";
import Modal from "./Modal";

const RentModals = () => {
  const rentModal = useRentModal();
  return (
    <>
      <Modal
        isOpen={rentModal.isOpen}
        title="Airbnb your home!"
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel="Submit"
      />
    </>
  );
};

export default RentModals;
