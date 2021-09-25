import './grid.scss'
import Vue from 'vue'
import router from 'vue-router'

export default {
    name: 'xp-grid',
    props: {
        cid: {
            type: String,
            default: '',
            require: false
        },
        columns: {
            type: Number,
            default: 2,
            require: true
        },
        width: {
            type: Number,
            default: 0,
            require: false
        },
        height: {
            type: Number,
            default: 0,
            require: false
        },
        marginTop: {
            type: Number,
            default: 5,
            require: false
        },
        marginLeft: {
            type: Number,
            default: 5,
            require: false
        },
        marginRight: {
            type: Number,
            default: 5,
            require: false
        },
        marginBottom: {
            type: Number,
            default: 5,
            require: false
        },
        paddingTop: {
            type: Number,
            default: 10,
            require: false
        },
        paddingLeft: {
            type: Number,
            default: 10,
            require: false
        },
        paddingRight: {
            type: Number,
            default: 10,
            require: false
        },
        paddingBottom: {
            type: Number,
            default: 10,
            require: false
        },rotate: {
            type: Number,
            default: 0,
            require: false
        },
        opacity: {
            type: Number,
            default: 1,
            require: false
        },
        border: {
            type: String,
            default: '1px #cccccc solid',
            require: false
        },
        borderRadius: {
            type: Number,
            default: 0,
            require: false
        },
        boxShadow: {
            type: String,
            require: false
        },
        background: {
            type: String,
            require: false
        },
    },
    render(h) {
        return (
            <div class="compo-grid">
                {this.$slots.default}
            </div>
        )
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
                let newCols = val - data.children.length;
                for(let i=0; i<newCols; i++){
                    this.addComponent({
                        name: 'xp-cell',
                        path: 'common/Cell/Cell',
                        props: {}
                    });
                }
            }
        }
    }
}

