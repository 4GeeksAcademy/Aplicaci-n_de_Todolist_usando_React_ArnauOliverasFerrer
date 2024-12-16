import React from "react";
import { useState } from "react";

//create your first component
const Item = ({ TaskName, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <li className="list-group-item" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="mx-5 fs-4 d-flex justify-content-between">
                {TaskName}
                {isHovered && (
                    <button
                        type="button"
                        className="btn-close"
                        onClick={onDelete}
                    ></button>
                )}
            </div>
        </li>
    );
};

export default Item;