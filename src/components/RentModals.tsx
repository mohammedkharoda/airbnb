"use client";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import useRentModal from "../hooks/useRentModal";
import { categories } from "./Categories";
import CategoryInput from "./CategoryInput";
import Heading from "./Heading";
import Modal from "./Modal";
import CountrySelect from "./CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../common/Counter";
import ImageUpload from "./ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModals = () => {
  const rentModal = useRentModal();
  const [steps, setSteps] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomsCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setSteps((value) => value - 1);
  };

  const onNext = () => {
    setSteps((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (steps === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [steps]);

  const Map = useMemo(
    () => dynamic(() => import("./Map"), { ssr: false }),
    [location]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your place ?"
        subtitle="Pick a Category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category: any) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Location
  if (steps === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your plce located ?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  // Info
  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 ">
        <Heading
          title="Share some basics about your place"
          subtitle="What amienties do you have "
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomsCount}
          title="Rooms"
          subtitle="How many Room do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Guests"
          subtitle="How many Bathroom do you want?"
        />
      </div>
    );
  }

  // Images
  if (steps === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show people what your space look like!"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  return (
    <>
      <Modal
        isOpen={rentModal.isOpen}
        title="Airbnb your home!"
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        body={bodyContent}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
      />
    </>
  );
};

export default RentModals;
