<template>
    <div class="">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>

</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const config = [
    {
        name: 'wxCouponUrl',
        title: 'wx红包',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'naCouponUrl',
        title: 'na红包',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'NASharePicSrc',
        title: 'NA分享图片链接',
        type: String,
        default: '/public/images/no-image-icon.png',
        require: true,
        component: 'InputUpload'
    },
    {
        name: 'wxSharePicSrc',
        title: '微信分享图片链接',
        type: String,
        default: '/public/images/no-image-icon.png',
        require: true,
        component: 'InputUpload'
    },
    {
        name: 'wxShareTitle',
        title: '微信分享标题',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
    {
        name: 'wxShareDesc',
        title: '微信分享描述',
        type: String,
        default: '',
        require: true,
        component: 'InputText'
    },
]

export default {
    name: 'xp-april-activity-share-property',
    components: {
        'xp-form': Form
    },
    props: Utils.toProps(config),
    data() {
        return {
            fields: Utils.toData(config, this)
        }
    },
    methods: {
        valueChange(data){
            this.dispatchPropertyChange(data);
        }
    }
}
</script>

<style>
</style>
