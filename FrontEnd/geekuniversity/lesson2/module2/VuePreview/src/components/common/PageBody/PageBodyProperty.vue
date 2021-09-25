<template>
    <div class="compo-body-prop">
        <div class="line-item">
            <span class="label">背景</span>
            <xp-style-background :background="background" :change="backgroundChange"></xp-style-background>
        </div>
    </div>
</template>

<script>
import StyleBackground from '../StyleBackground/StyleBackground';
export default {
    name: 'xp-page-body-property',
    components: {
        'xp-style-background': StyleBackground
    },
    props: {
        background: {
            type: String,
            require: false,
            default: ''
        }
    },
    methods: {
        backgroundChange(val) {
            eventHub.$emit('xp-com-body-property-change', { background: val });
        }
    }
}
</script>

<style>
.compo-body-prop .line-item {
    padding: 6px 0;
}

.compo-body-prop .line-item .label {
    display: inline-block;
    padding-right: 5px;
    width: 70px;
    text-align: right;
    font-size: 14px;
    vertical-align: middle;
    color: #222;
}

.compo-body-prop .input-item {
    display: inline-block;
    padding: 3px 10px;
    box-sizing: border-box;
    color: #1f2d3d;
    height: 34px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #C0CCDA;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    outline: 0;
    line-height: normal;
    vertical-align: middle;
}

.compo-body-prop .input-item:hover {
    border-color: #8492A6;
}

.compo-body-prop .input-item:focus {
    outline: 0;
    border-color: #20a0ff;
}
</style>
