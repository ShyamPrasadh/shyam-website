export function draggable(node, params) {
    let { handle, onDragStart, onDragEnd, onDrag } = params || {};

    let x;
    let y;
    let startX;
    let startY;

    const handleElement = handle ? node.querySelector(handle) : node;

    if (!handleElement) {
        console.warn('Draggable handle not found');
        return;
    }

    handleElement.style.cursor = 'grab';

    function handleMousedown(event) {
        if (event.target.closest('.window-controls')) return; // Don't drag if clicking controls

        event.preventDefault();
        x = event.clientX;
        y = event.clientY;

        // Get current transform values if any, or use 0
        // We assume the parent component manages the actual position via style.left/top
        // This action just emits deltas or updates

        if (onDragStart) onDragStart();

        handleElement.style.cursor = 'grabbing';

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);
    }

    function handleMousemove(event) {
        const dx = event.clientX - x;
        const dy = event.clientY - y;

        x = event.clientX;
        y = event.clientY;

        if (onDrag) {
            onDrag({ dx, dy });
        }
    }

    function handleMouseup() {
        handleElement.style.cursor = 'grab';
        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);

        if (onDragEnd) onDragEnd();
    }

    handleElement.addEventListener('mousedown', handleMousedown);

    return {
        destroy() {
            handleElement.removeEventListener('mousedown', handleMousedown);
        },
        update(newParams) {
            // Update params if needed
        }
    };
}
