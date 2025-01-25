import React from "react";

interface DeleteButtonProps {
    onDelete: () => void;
    label?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, label = "Excluir"}) => {
    return (
        <button
            onClick={onDelete}
            style={{
                padding: "5px 10px",
                margin:"0 5px",
                backgroundColor: "#F44336",
                color: "fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
            }}
            >
            {label}
        </button>
    );
};

export default DeleteButton;