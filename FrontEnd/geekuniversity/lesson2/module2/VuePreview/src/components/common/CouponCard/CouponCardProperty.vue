<template>
    <div class="compo-coupon-card-property">
        <div class="line-item">
            <span class="label">批次</span>
            <input class="input-item" type="text" placeholder="请输入批次号"
                   v-model.lazy="formData.couponTypeId" @change="valueChange" />
        </div>

        <div class="split"></div>

        <div class="line-item">
            <span class="label">字体颜色</span>
            <input class="input-item" type="text" placeholder="请输入字体颜色"
                   v-model="formData.fontColor" @change="valueChange" />
        </div>

        <div class="line-item">
            <span class="label">卡片背景色</span>
            <input class="input-item" type="text" placeholder="请输入卡片背景色"
                   v-model="formData.cardBackgroundColor" @change="valueChange" />
        </div>

        <div class="line-item">
            <span class="label">圆角背景色</span>
            <input class="input-item" type="text" placeholder="请输入圆角背景色"
                   v-model="formData.semiBackgroundColor" @change="valueChange" />
        </div>

        <div class="line-item">
            <span class="label">左右间距</span>
            <input class="input-item" type="text" placeholder="请输入左右间距"
                   v-model="formData.leftAndRightMargin" @change="valueChange" />
        </div>

        <div class="line-item">
            <span class="label">上间距</span>
            <input class="input-item" type="text" placeholder="请输入上间距"
                   v-model="formData.topMargin" @change="valueChange" />
        </div>
    </div>

</template>

<script>
    export default {
        name: 'xp-image-property',
        components: {
        },
        props: {
            couponTypeId: {
                type: String,
                default: '',
                require: false
            },
            cardBackgroundColor: {
                type: String,
                default: '#fb7d45',
                require: false
            },
            semiBackgroundColor: {
                type: String,
                default: '#fff',
                require: false
            },
            fontColor: {
                type: String,
                default: '#fff',
                require: false
            },
            leftAndRightMargin: {
                type: String,
                default: '10px',
                require: false
            },
            topMargin: {
                type: String,
                default: '10px',
                require: false
            }
        },
        data() {
            return {
                formData: {
                    couponTypeId: this.couponTypeId,
                    cardBackgroundColor: this.cardBackgroundColor,
                    semiBackgroundColor: this.semiBackgroundColor,
                    fontColor: this.fontColor,
                    leftAndRightMargin: this.leftAndRightMargin,
                    topMargin: this.topMargin
                }
            }
        },
        methods: {
            valueChange(){
                this.dispatchPropertyChange(this.formData);
            }
        }
    }
</script>
<style>
    .compo-coupon-card-property .line-item{
        padding: 6px 0;
    }
    .compo-coupon-card-property .line-item .label{
        display: inline-block;
        padding-right: 5px;
        width: 70px;
        text-align: right;
        font-size: 14px;
        vertical-align: middle;
        color: #222;
    }
    .compo-coupon-card-property .input-item{
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
    .compo-coupon-card-property .input-item.textarea{
        width: 200px;
        height: 50px;
    }
    .compo-coupon-card-property .input-item:hover {
        border-color: #8492A6;
    }
    .compo-coupon-card-property .input-item:focus {
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
</style>
