export const pointInDOMRect = ([x, y]: readonly [number, number], rect: DOMRect) => (
    x > rect.left && x < rect.right &&
    y > rect.top && y < rect.bottom
)