import React from "react";

interface EditButtonProps {
    onEdit: () => void;
    label?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit, label = "Editar" }) => {
    return(
        <button
            onClick={onEdit}
            style={{
                padding: "5px 10px", margin: "0 5px", backgroundColor: "#4CAF50", color: "fff", border: "none", borderRadius: "4px", cursor: "pointer",
            }} >
            {label}
        </button>
    );
};

export default EditButton;