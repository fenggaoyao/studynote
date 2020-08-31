import {
    createRenderer
} from './runtime-core.js'

const rendererOptions = {
    querySelector(sel) {
        return document.querySelector(sel)
    },
    createElement(type) {
        return document.createElement(type)
    },
    insert(child, parent) {
        parent.appendChild(child)
    }
}

let renderer;

function ensureRenderer() {
    return renderer || createRenderer(rendererOptions)
}

export const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args)
    return app;
}