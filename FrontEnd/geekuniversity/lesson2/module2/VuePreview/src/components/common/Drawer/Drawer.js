import './drawer.less'
import Vue from 'vue'
import Utils from 'utils'

const config = [
    {
        name: 'cid',
        title: 'cid',
        type: String,
        default: '',
        require: false,
        component: 'none'
    },
    {
        name: 'columns',
        title: '列数',
        type: Number,
        default: 2,
        require: true,
        component: 'InputNumber'
    },
    {
        name: 'active',
        title: '激活',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
];

export default {
    name: 'xp-drawer',
    props: Utils.toProps(config),
    render(h) {
        let me = this;
        if(this.$slots.default && this.$slots.default.length > 0){
            return (
                <div class="compo-drawer">
                    {
                        this.$slots.default.map((item, index) => {
                            if(index == this.active){
                                return <div class="drawer-item">{item}</div>;
                            } else {
                                return <div class="drawer-item" style="display: none">{item}</div>;
                            }
                        })
                    }
                </div>
            )
        } else {
            return (
                <div class="compo-drawer"></div>
            )
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
                            name: 'xp-block',
                            path: 'common/Block/Block',
                            props: {
                                marginTop: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                paddingTop: 0,
                                paddingLeft: 0,
                                paddingRight: 0,
                                paddingBottom: 0,
                                border: '0px #cccccc solid'
                            }
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
        }
    }
}

