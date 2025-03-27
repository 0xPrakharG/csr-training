import { useDraggable } from "@dnd-kit/core";

const DraggableTask = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="task"
            style={{
                transform: transform
                    ? `translate(${transform.x}px, ${transform.y}px)`
                    : undefined,
            }}
        >
            {task.content}
        </div>
    );
};

export default DraggableTask;
