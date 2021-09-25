import Vue from 'vue'
import VuePopup from 'vue-popup'
let seed = 1;

export default function (clas, options, closeModel) {
    let instance;
    let ComponentConstructor = Vue.extend(clas);
    let id = '_dynamic_' + (++seed);

    options = options || {};

    instance = new ComponentConstructor({
        data: options
    });

    if(closeModel == undefined) {
        closeModel = true;
    }

    instance.destroy = () => {
        document.body.style.overflow = 'auto';
        document.body.removeChild(instance.vm.$el);
        // if (closeModel) {
        //     let modal = document.getElementsByClassName('v-modal')[0];
        //     document.body.removeChild(modal)
        // } else {
        //     let zindex = VuePopup && VuePopup.PopupManager && VuePopup.PopupManager.nextZIndex() || 2000;
        //     let modal = document.getElementsByClassName('v-modal')[0];
        //     modal.style.zIndex = zindex - 2;
        // }
        let modal = document.getElementsByClassName('v-modal')[0];
        document.body.removeChild(modal)
        instance = null;
    };

    instance.id = id;
    instance.vm = instance.$mount();
    let el = instance.vm.$el;
    let zindex = VuePopup && VuePopup.PopupManager && VuePopup.PopupManager.nextZIndex() || 2000;
    el.style.zIndex = zindex;
    el.style.backgroundColor = 'rgba(0,0,0,0.4)';
    document.body.appendChild(el);
    instance.vm.visible = true;
}
