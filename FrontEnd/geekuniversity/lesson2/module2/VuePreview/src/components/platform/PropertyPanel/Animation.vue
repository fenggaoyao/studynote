<template>
    <div class="compo-animation-property">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>

</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'

const ans = [
    {label: 'bounce', value: 'bounce'},
    {label: 'flash', value: 'flash'},
    {label: 'pulse', value: 'pulse'},
    {label: 'shake', value: 'shake'},
    {label: 'swing', value: 'swing'},
    {label: 'tada', value: 'tada'},
    {label: 'wobble', value: 'wobble'},
    {label: 'jello', value: 'jello'},
    {label: 'bounceIn', value: 'bounceIn'},
    {label: 'bounceInDown', value: 'bounceInDown'},
    {label: 'bounceInLeft', value: 'bounceInLeft'},
    {label: 'bounceInRight', value: 'bounceInRight'},
    {label: 'bounceInUp', value: 'bounceInUp'},
    {label: 'bounceOut', value: 'bounceOut'},
    {label: 'bounceOutDown', value: 'bounceOutDown'},
    {label: 'bounceOutLeft', value: 'bounceOutLeft'},
    {label: 'bounceOutRight', value: 'bounceOutRight'},
    {label: 'bounceOutUp', value: 'bounceOutUp'},
    {label: 'fadeIn', value: 'fadeIn'},
    {label: 'fadeInDown', value: 'fadeInDown'},
    {label: 'fadeInDownBig', value: 'fadeInDownBig'},
    {label: 'fadeInLeft', value: 'fadeInLeft'},
    {label: 'fadeInLeftBig', value: 'fadeInLeftBig'},
    {label: 'fadeInRight', value: 'fadeInRight'},
    {label: 'fadeInRightBig', value: 'fadeInRightBig'},
    {label: 'fadeInUp', value: 'fadeInUp'},
    {label: 'fadeInUpBig', value: 'fadeInUpBig'},
    {label: 'fadeOut', value: 'fadeOut'},
    {label: 'fadeOutDown', value: 'fadeOutDown'},
    {label: 'fadeOutDownBig', value: 'fadeOutDownBig'},
    {label: 'fadeOutLeft', value: 'fadeOutLeft'},
    {label: 'fadeOutLeftBig', value: 'fadeOutLeftBig'},
    {label: 'fadeOutRight', value: 'fadeOutRight'},
    {label: 'fadeOutRightBig', value: 'fadeOutRightBig'},
    {label: 'fadeOutUp', value: 'fadeOutUp'},
    {label: 'fadeOutUpBig', value: 'fadeOutUpBig'},
    {label: 'flip', value: 'flip'},
    {label: 'flipInX', value: 'flipInX'},
    {label: 'flipInY', value: 'flipInY'},
    {label: 'flipOutX', value: 'flipOutX'},
    {label: 'flipOutY', value: 'flipOutY'},
    {label: 'lightSpeedIn', value: 'lightSpeedIn'},
    {label: 'lightSpeedOut', value: 'lightSpeedOut'},
    {label: 'rotateIn', value: 'rotateIn'},
    {label: 'rotateInDownLeft', value: 'rotateInDownLeft'},
    {label: 'rotateInDownRight', value: 'rotateInDownRight'},
    {label: 'rotateInUpLeft', value: 'rotateInUpLeft'},
    {label: 'rotateInUpRight', value: 'rotateInUpRight'},
    {label: 'rotateOut', value: 'rotateOut'},
    {label: 'rotateOutDownLeft', value: 'rotateOutDownLeft'},
    {label: 'rotateOutDownRight', value: 'rotateOutDownRight'},
    {label: 'rotateOutUpLeft', value: 'rotateOutUpLeft'},
    {label: 'rotateOutUpRight', value: 'rotateOutUpRight'},
    {label: 'slideInUp', value: 'slideInUp'},
    {label: 'slideInDown', value: 'slideInDown'},
    {label: 'slideInLeft', value: 'slideInLeft'},
    {label: 'slideInRight', value: 'slideInRight'},
    {label: 'slideOutUp', value: 'slideOutUp'},
    {label: 'slideOutDown', value: 'slideOutDown'},
    {label: 'slideOutLeft', value: 'slideOutLeft'},
    {label: 'slideOutRight', value: 'slideOutRight'},
    {label: 'zoomIn', value: 'zoomIn'},
    {label: 'zoomInDown', value: 'zoomInDown'},
    {label: 'zoomInLeft', value: 'zoomInLeft'},
    {label: 'zoomInRight', value: 'zoomInRight'},
    {label: 'zoomInUp', value: 'zoomInUp'},
    {label: 'zoomOut', value: 'zoomOut'},
    {label: 'zoomOutDown', value: 'zoomOutDown'},
    {label: 'zoomOutLeft', value: 'zoomOutLeft'},
    {label: 'zoomOutRight', value: 'zoomOutRight'},
    {label: 'zoomOutUp', value: 'zoomOutUp'},
    {label: 'hinge', value: 'hinge'},
    {label: 'rollIn', value: 'rollIn'},
    {label: 'rollOut', value: 'rollOut'}
];

const count = [
    {label: 'infinite', value: 'infinite'},
    {label: '0', value: '0'},
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: 'shake'},
    {label: '4', value: 'swing'},
    {label: '5', value: 'tada'},
    {label: '6', value: 'wobble'},
    {label: '7', value: 'jello'},
    {label: '8', value: 'bounceIn'},
    {label: '9', value: '9'},
    {label: '10', value: '10'}
];

const fields = [
    {
        name: 'delay',
        title: '延迟',
        type: Number,
        default: 0,
        require: false,
        component: 'InputNumber'
    },
    {
        name: 'animationType',
        title: '动画类型',
        type: String,
        default: [],
        require: false,
        component: 'InputSelect',
        props: {
            options: ans
        }
    },
    {
        name: 'loop',
        title: '循环次数',
        type: Number,
        default: 0,
        require: false,
        component: 'InputSelect',
        props: {
            options: count
        }
    }
];

export default {
    name: 'xp-animation',
    components: {
        'xp-form': Form
    },
    props: {
        cid: {
            type: String,
            default: '',
            require: false,
        },
        animation: {
            type: String,
            default: ' ',
            require: false,
        }
    },
    data() {
        let as = this.animation.split(' ');
        let context = {
            delay: as[1] || 0,
            animationType: ans,
            loop: as[2] || 0
        };
        return {
            delay: context.delay,
            animationType: context.animationType,
            loop: context.loop,
            fields: Utils.toData(fields, context)
        };
    },
    methods: {
        valueChange(data){
            data.delay && (this.delay = data.delay);
            data.animationType && (this.animationType = data.animationType);
            data.loop && (this.loop = data.loop);

            let pp = [this.animationType, this.delay, this.loop].join(' ');
            this.dispatchPropertyChange({animation: pp});
        }
    }
}
</script>

<style type="less-loader">
</style>
