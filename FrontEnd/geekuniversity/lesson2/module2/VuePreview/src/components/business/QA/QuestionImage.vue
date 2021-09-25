<template>
    <div class="compo-question">
        <div class="question-item">
            <p><img :src="titleImage"/></p>
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
        name: 'titleImage',
        title: '图片',
        type: String,
        default: '',
        require: false,
        component: 'InputUpload'
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
    name: 'xp-question-image',
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
                this.score = score;
                this.showAnswer(no);
            }
        },

        showAnswer(no){
            this.$children.forEach( (item, idx) => {
                if(item.no == no){
                    item.result = 1;
                } else {
                    item.result = -1;
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
                padding-left: 0.5rem;
                .component-item, .compo-answer{
                    display: inline-block;
                    width: 50%;
                }
            }
        }
    }
</style>

