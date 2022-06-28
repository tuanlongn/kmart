import { useState } from "react";

const useModal = (initialState: boolean): [boolean, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState);

  function toogleModal() {
    setIsOpen(!isOpen);
  }

  return [isOpen, toogleModal];
};

export default useModal;
