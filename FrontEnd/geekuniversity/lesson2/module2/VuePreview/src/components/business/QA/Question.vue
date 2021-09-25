<template>
    <div class="compo-question">
        <div class="question-item">
            <p>{{no}}.{{titleText}}</p>
            <p v-if="titleImage"><img :src="titleImage"/></p>
            <p>{{titleAudio}}</p>
            <div :class="cn">
                <slot></slot>
            </div>
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
        default: '一',
        require: false,
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
        name: 'answers',
        title: '答案',
        type: String,
        default: '',
        require: false,
        component: 'InputAudioUpload'
    },
    {
        name: 'arrange',
        title: '答案排列',
        type: String,
        default: 'horizontal',
        require: false,
        component: 'InputText'
    }
];

export default {
    name: 'xp-question',
    components: {
    },
    props: Utils.toProps(config),
    data(){
        return {
            result: -1,
            score: 0,
            finished: false
        }
    },
    computed: {
        cn() {
            if(this.arrange == 'horizontal'){
                return 'answers-area-h'
            } else {
                return 'answers-area-v'
            }
        },
        multi () {
            if(this.answers.indexOf(',') !== -1){
                return true;
            }
            return false;
        }
    },
    methods: {
        checkAnswer(no, score){
            if(this.multi){
                //this.userAnswer.push({no, score});
            } else {
                if(!this.finished){
                    if(no == this.answers){
                        this.result = 1;
                        this.score = score;
                    } else {
                        this.result = 0;
                        this.score = 0;
                    }
                    this.showAnswer(no);
                    this.finished = true
                }
            }
        },

        showAnswer(no){
            this.$children.forEach( (item, idx) => {
                if(item.no == this.answers){
                    item.result = 1;
                } else if(item.no == no){
                    item.result = 0;
                }
            })
        }
    }
}
</script>
<style lang="less-loader">
    .compo-question{
        display: block;
        
        .question-item{
            font-weight: bolder;
            padding: 0.2rem;
            font-size: 0.34rem;
            color: #323232;
            img{
                width: 100%;
                padding: 0.2rem 0 0 0;
            }
            .answers-area-h {
                .component-item, .compo-answer{
                    display: inline-block;
                    width: 50%;
                }
            }
        }
    }
</style>

