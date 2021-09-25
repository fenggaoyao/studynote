import {
    createRenderer
} from './runtime-core.js'

let canvas, ctx
const nodeOps = {
    createElement(tag) {
        if (tag === 'canvas') {
            canvas = document.createElement('canvas')
            ctx = canvas.getContext('2d')
            return canvas
        }
        return {
            tag
        }
    },
    insert(child, parent) {
        if (!child.nodeType) {
            //子元素，比如rect
            parent.elements = parent.elements || [];
            parent.elements.push(child);
        } else {
            parent.appendChild(child)
            draw()
        }
    }
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.with, canvas.height);
    canvas.elements.forEach(element => {
        if (element.tag === 'rect') {
            const {
                x,
                y,
                width,
                height,
                fillStyle
            } = element
            ctx.fillStyle = fillStyle;
            ctx.fillRect(x, y, width, height);
        } else if (element.tag === 'arc') {
            const {
                x,
                y,
                r,
                fillStyle
            } = element;

            ctx.beginPath();
            ctx.fillStyle = fillStyle;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.stroke();

        }
    })


}

const patchProp = (el, key, preValue, nextValue) => {
    el[key] = nextValue
}


let renderer

function ensureRenderer() {
    return renderer || createRenderer({
        ...nodeOps,
        patchProp
    })
}

export const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);
    return app;
}