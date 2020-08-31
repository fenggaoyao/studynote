function apiCreateApp(render) {
    return function createApp(rootComponent) {
        const mount = (rootContainer) => {
            const initVode = {
                type: 'h2',
                props: {
                    class: 'title'
                },
                children: rootComponent.data().foo
            }
            render(initVode, rootContainer)
        }

        const app = {
            mount
        }

        return app
    }
}

export const createRenderer = (options) => {
    const render = function (vnode, container) {
        // const container = document.querySelector(root) || document.createElement("container") 

        //获取父元素
        const parent = options.querySelector(container)

        const child = options.createElement(vnode.type)

        if (typeof vnode.children === 'string') {
            child.textContent = vnode.children
        }

        // 3 追加
        options.insert(child, parent)

        // const n1 = container._vnode;
        // const n2 = null;

        // if (!n1) {
        //     //第一次挂载
        //     mountComponent()

        // } else {
        //     //
        //     UpdateComponent()

        // }

        //把传入vnode变成dom,追加到container

    }

    return {
        render,
        createApp: apiCreateApp(render)
    }
}

//需要一个渲染器，参数是各种平台节点和属性操作
