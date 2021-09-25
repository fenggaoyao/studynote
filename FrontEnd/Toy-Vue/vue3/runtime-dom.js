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

function normalizeContainer(container) {
    const res = document.querySelector(container)
    return res
}

export const createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);

    const {
        mount
    } = app;
    app.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector)
        const proxy = mount(container)
        return proxy
    }


    return app;
}