import './componentList.less';

import Vue from 'vue'
import Card from './ComponentCard'
import WidgetCard from './WidgetCard'

export default {
    props: {
        data: {
            type: Array,
            require: true
        },
        type: {
            type: String,
            require: false
        }
    },

    components: {
        'xp-widget-card': WidgetCard,
        'xp-component-card': Card,
    },

    render(h) {
        return (
            <div class="compo-list-wrapper">
            {
                this.data.map((item)=>{
                    if(this.type == 'widget'){
                        return h('xp-widget-card', {props: {...item}});
                    } else {
                        return h('xp-component-card', {props: {...item}});
                    }
                })
            }
            </div>
        )
    }

}
