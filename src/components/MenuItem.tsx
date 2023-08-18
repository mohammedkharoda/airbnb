"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <>
      <div
        className="px-4 hover:bg-neutral-100 transition font-semibold py-3"
        onClick={onClick}
      >
        {label}
      </div>
    </>
  );
};

export default MenuItem;
