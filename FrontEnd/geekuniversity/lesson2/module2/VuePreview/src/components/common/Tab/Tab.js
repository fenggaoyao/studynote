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
        name: 'margin',
        title: '外边距',
        default: '0 0 0 0',
        require: false,
        component: 'InputLRTB'
    },
];

export default {
    name: 'xp-tab',
    props: Utils.toProps(config),

    created(){
        let me = this;
        let cid = me.getCid();
        eventHub.$on('button-group-change', (index, cid)=>{
            let node = this.getModelData();
            if(node.children[0].cid == cid){
                let cnode = node.children[1];
                this.updateProps(cnode.cid, {active: parseInt(index)});
            }
        });
    },

    render(h) {
        let me = this;
        if(this.$slots.default && this.$slots.default.length == 2){
            return (
                <div class="compo-tab" style={this.cssText}>
                    <div class="tab-header">
                        {this.$slots.default[0]}
                    </div>
                    <div class="tab-body">
                        {this.$slots.default[1]}
                    </div>
                </div>
            )
        } else {
            return <div class="compo-tab">数据有问题</div>
        }
    },
    mounted() {
        this.padTabs(this.columns);
    },

    computed: {
        cssText(){
            return {
                margin: this.margin
            };
        }
    },

    watch: {
        columns: function(val, oldVal){
            this.padTabs(val);
        }
    },
    methods: {
        padTabs(val){
            let me = this;
            let data = this.getModelData();
            if(data){
                let head = data.children[0];
                let body = data.children[1];
                if(!head){
                    this.addComponent({
                        name: 'xp-button-group',
                        path: 'common/ButtonGroup/ButtonGroup',
                        props: {columns: me.columns}
                    });
                } else {
                    head.props.columns = me.columns;
                }
                if(!body){
                    this.addComponent({
                        name: 'xp-drawer',
                        path: 'common/Drawer/Drawer',
                        props: {columns: me.columns, active: 0}
                    });
                } else {
                    body.props.columns = me.columns;
                }
            }
        }
    }
}

