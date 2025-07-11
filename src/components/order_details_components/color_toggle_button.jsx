import { useState } from "react";
import api from "../../services/api";
import "./color_toggle_button.css";

const ColorToggleButton = ({ orderId }) => {
  const [isGreen, setIsGreen] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const toggleColor = async () => {
    if (disabled) return;
    const idToken = localStorage.getItem("token");
    if (!idToken) {
      console.error("No token found. Please log in.");
      return;
    }
    try {
      await api.patch(
        `/api/orders/markCompleted/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      setIsGreen(false);
      setDisabled(true);
    } catch (err) {
      console.error("Failed to mark order as completed:", err);
    }
  };

  return (
    <button
      className={`toggle-button ${isGreen ? "green" : "red"}`}
      onClick={toggleColor}
      disabled={disabled}
    />
  );
};

export default ColorToggleButton;
