import './productDataProvider.less';

import Vue from 'vue'
import http from 'request'
import utils from 'utils'
import ContainerMixin from 'components/common/common/ContainerMixin'

export default {
    name: 'xp-product-data-provider',
    mixins: [ContainerMixin],
    props: {
        cid: {
            type: String,
            default: '',
            require: false
        },
        url: {
            type: String,
            default: 'http://http://waimai.baidu.com/pinzhi/api/getiteminfobyids',
            require: true
        },
        param: {
            type: String,
            require: false,
            default: 'item_ids'
        },
        valueType: {
            require: false,
        }
    },
    data(){
        return {
            containerData: [],
            ids: []
        }
    },
    render(h) {
        return (
            <div class="compo-product-data-provider">
                {this.$slots.default}
            </div>
        );
    },
    created(){
        this.fetchProductsInfo();
    },
    updated(){
        let ids = this.getChildrenProps(this.cid, 'productId');
        if(ids.join(',') != this.ids.join(',')){
            this.fetchProductsInfo();
        }
    },
    methods: {
        fetchProductsInfo(){
            let me = this;
            if(this.url && this.param){
                me.ids = this.getChildrenProps(this.cid, 'productId');
                //debug
                let serverUrl = this.url.replace('http://waimai.baidu.com', '');
                let urlParam = {};
                urlParam[this.param] = me.ids.join(',');

                http.get({
                    url: serverUrl,
                    param: urlParam
                }).then(data => {
                    if(data.error_no == 0){
                        let li = data.result.item_list;
                        me.containerData = me.ids.map(item => {
                            return li[item];
                        });
                        if(this.valueType == '1'){
                            me.repeatChild(me.cid, me.containerData);
                        } else {
                            me.setChildrenProps(me.cid, me.containerData, 'productId');
                        }
                    }
                })
            }
        }
    }
};