import './buttonGroup.less'
import Vue from 'vue'
import Utils from 'utils'

const config = [
    {
        name: 'columns',
        title: '列数',
        type: Number,
        default: 2,
        require: true,
        component: 'InputNumber'
    }
];

export default {
    name: 'xp-button-group',
    props: Utils.toProps(config),
    render(h) {
        let me = this;
        if(me.$slots.default && me.$slots.default.length > 0){
            return (
                <div class="compo-button-group">
                    {
                        me.$slots.default.map( (item, index) => {
                            return (
                                <div class="event-wrapper" data-index={index} on-click={me.buttonClick}>
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            );
        } else {
            return (
                <div class="compo-button-group"></div>
            );
        }
    },
    mounted() {
        this.padCells(this.columns);
    },

    watch: {
        columns: function(val, oldVal){
            this.padCells(val);
        }
    },
    methods: {
        padCells(val){
            let data = this.getModelData();
            if(data){
                if(val >= data.children.length){
                    let newCols = val - data.children.length;
                    for(let i=0; i<newCols; i++){
                        this.addComponent({
                            name: 'xp-active-item',
                            path: 'common/ActiveItem/ActiveItem',
                            props: {}
                        });
                    }
                } else {
                    let newCols = data.children.length - val;
                    for(let i=0; i<newCols; i++){
                        let child = data.children.pop();
                        this.removeComponent(child.cid);
                    }
                }
            }
        },

        buttonClick(e){
            let index = e.currentTarget.getAttribute('data-index');
            let node = this.getModelData();
            let childrens = node.children.map((item, idx) => {
                if(idx == index){
                    item.props.active = true;
                } else {
                    item.props.active = false;
                }
                return item;
            });
            this.setChildren(childrens);
            this.newSak({
                daSrc: 'tab_' + index + '.click',
                daAct: 'click'
            });
            eventHub.$emit('button-group-change', index, node.cid);
        }
    }
}

