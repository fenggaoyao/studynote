<template>
    <div class="compo-answer">
        <div class="answer-item" @click="checkAnswer">
            <p>{{no}}.{{titleText}}</p>
            <p v-if="titleImage"><img :src="titleImage"/></p>
            <p>{{titleAudio}}</p>
            <div class="answer-result" v-if="result == 0"><i class="icon-wrong"></i></div>
            <div class="answer-result" v-if="result == 1"><i class="icon-right"></i></div>
            <div class="answer-result" v-if="result == -1"></div>
        </div>
    </div>
</template>

<script>
import Utils from 'utils'

const config = [
    {
        name: 'no',
        title: '编号',
        type: String,
        default: 'A',
        require: true,
        component: 'InputText'
    },
    {
        name: 'titleText',
        title: '文字',
        type: String,
        default: '',
        require: false,
        component: 'InputArea'
    },
    {
        name: 'titleImage',
        title: '图片',
        type: String,
        default: '',
        require: false,
        component: 'InputUpload'
    },
    {
        name: 'titleAudio',
        title: '音频',
        type: String,
        default: '',
        require: false,
        component: 'InputAudioUpload'
    },
    {
        name: 'score',
        title: '分数',
        type: Number,
        default: 5,
        require: false,
        component: 'InputNumber'
    }
];

export default {
    name: 'xp-answer',
    components: {
    },
    props: Utils.toProps(config),
    data(){
        return {
            result: -1,
        }
    },
    methods: {
        checkAnswer(e){
            this.$parent.checkAnswer(this.no, this.score);
        }
    }
}
</script>
<style lang="less-loader">
    .compo-answer{
        display: block;
        cursor: pointer;

        .answer-item{
            padding: 5px 0;
            position: relative;
            font-weight: normal;
            font-size: 0.3rem;
            color: #5b5b5b;
            img{
                width: 80%;
                padding: 0.2rem 0;
            }
            .answer-result{
                position: absolute;
                left: 0;
                top: 8px;
                z-index: 10;
            }
            .icon-right{
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url(./right.png);
                background-size: 100% 100%;
            }
            .icon-wrong{
                display: inline-block;
                width: 20px;
                height: 20px;
                background-image: url(./wrong.png);
                background-size: 100% 100%;
            }
        }
    }
</style>

