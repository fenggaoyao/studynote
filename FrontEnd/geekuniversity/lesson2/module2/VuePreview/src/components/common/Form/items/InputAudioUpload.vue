<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <xp-audio-upload :src="val" :change="srcChange"></xp-audio-upload>
    </div>
</template>

<script>
import AudioUpload from 'components/common/AudioUpload/AudioUpload'
export default {
    name: 'xp-input-audio-upload',
    props: {
        title: {
            type: String,
            default: '',
            required: false
        },
        name: {
            type: String,
            required: true
        },
        default: {
            type: String,
            default: 'text',
            required: false
        },
        component: {
            type: String,
            default: 'text',
            required: false
        },
        value: {
            type: String,
            required: false
        },
        valueChange: {
            type: Function,
            require: false
        },
        validate: {
            type: String,
            default: () => '',
            required: false
        }
    },
    components: {
        'xp-audio-upload': AudioUpload
    },
    data(){
        return {
            val: this.value
        }
    },
    methods: {
        srcChange(v){
            this.val = v;
            this.valueChange && this.valueChange(this.name, this.val, 'InputAudioUpload');
        }
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputAudioUpload');
        })
    }
}
</script>
