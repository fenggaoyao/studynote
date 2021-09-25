<template>
    <div class="line-item">
        <span class="label">{{title}}</span>
        <xp-image-upload :src="val" :change="srcChange"></xp-image-upload>
    </div>
</template>

<script>
import ImageUpload from 'components/common/ImageUpload/ImageUpload';
export default {
    name: 'xp-input-upload',
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
        'xp-image-upload': ImageUpload
    },
    data(){
        return {
            val: this.value
        }
    },
    methods: {
        srcChange(v){
            this.val = v;
            this.valueChange && this.valueChange(this.name, this.val, 'InputUpload');
        }
    },

    created(){
        eventHub.$on('xp-reset', ()=>{
            this.val = '';
            this.valueChange && this.valueChange(this.name, 0, 'InputUpload');
        })
    }
}
</script>


