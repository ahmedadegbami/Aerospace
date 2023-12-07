import React from "react";

interface AlertMessageProps {
  handleAction: () => Promise<void>;
  handleTextareaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AlertMessage = ({
  handleAction,
  handleTextareaChange,
}: AlertMessageProps) => {
  return (
    <div style={{ marginTop: "30px" }}>
      <textarea
        placeholder="Send instructions to crew members"
        rows={12}
        cols={50}
        onChange={handleTextareaChange}
      />
      <button onClick={() => handleAction()} style={{ display: "block" }}>
        Send Message
      </button>
    </div>
  );
};

export default AlertMessage;
