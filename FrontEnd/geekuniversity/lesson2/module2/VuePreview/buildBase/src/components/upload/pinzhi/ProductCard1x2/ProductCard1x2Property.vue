<template>
    <div class="compo-product-card-property-1x1">
        <div>
            <div class="line-item">
                <span class="label">商品Id</span>
                <input class="input-item" type="text" placeholder="请输入商品Id" v-model="formData.productId" @change="valueChange"></input>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'xp-product-card-1x2-property',
    components: {
    },
    props: {
        productId: {
            type: String,
            default: '',
            require: false
        }
    },
    data() {
        return {
            formData: {
                productId: this.productId,
                link: this.link
            }
        };
    },
    methods: {
        valueChange(){
            this.dispatchPropertyChange(this.formData);
        }
    },
    watch: {
        productId: function(val, oldValue){
            this.formData.productId = val;
        },
        link: function(val, oldValue){
            this.formData.link = val;
        }
    }
}
</script>

<style lang="sass-loader">
    .compo-product-card-property-1x1{
        .line-item{
            padding: 6px 0;

            .label{
                display: inline-block;
                padding-right: 5px;
                width: 70px;
                text-align: right;
                font-size: 14px;
                vertical-align: middle;
                color: #222;
            }
        }
        .input-item{
            display: inline-block;
            padding: 3px 10px;
            box-sizing: border-box;
            color: #1f2d3d;
            height: 34px;
            background-color: #fff;
            background-image: none;
            border: 1px solid #C0CCDA;
            border-radius: 4px;
            -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            outline: 0;
            line-height: normal;
            vertical-align: middle;
        }
        .input-item.textarea{
            width: 200px;
            height: 50px;
        }
        .input-item:hover {
            border-color: #8492A6;
        }
        .input-item:focus {
            outline: 0;
            border-color: #20a0ff;
        }
        .item-slide{
            width: 60%;
            padding: 0 10px;
            display: inline-block;
            vertical-align: middle;
        }
        .mini{
            width: 60px;
            margin-right: 5px;
        }
        .item-radiogroup{
            vertical-align: middle;
        }
    }
    
</style>
