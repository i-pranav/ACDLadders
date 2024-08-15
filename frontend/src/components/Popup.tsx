import React from "react";

interface PopupProps {
  isVisible: boolean;
  onClose: () => void;
  message: string;
}

const Popup: React.FC<PopupProps> = ({ isVisible, onClose, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-[#2b2c3e]">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-200">
            Error 👀
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-300">{message}</p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
