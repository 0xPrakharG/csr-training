import { useDroppable } from "@dnd-kit/core";

const DroppableColumn = ({ id, title, children }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="droppable-column">
            <h2>{title}</h2>
            {children}
        </div>
    );
};

export default DroppableColumn;
