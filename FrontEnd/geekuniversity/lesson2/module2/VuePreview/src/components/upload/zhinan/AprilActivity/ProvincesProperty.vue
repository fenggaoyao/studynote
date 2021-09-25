<template>
    <div class="">
        <xp-form :fields="fields" :change="valueChange"></xp-form>
    </div>

</template>

<script>
import Utils from 'utils'
import Form from 'components/common/Form/Form'
import provincesData from './provincesData'

const generateConfig = (data) => {
    let config = []
    data.forEach(area => {
        config.push({
            component: 'split'
        })
        area.provinces.forEach(province => {
            config.push({
                name: province.key,
                title: province.name + '链接地址',
                type: String,
                require: false,
                component: 'InputText'
            })
        })
    })
    return config
}

export default {
    name: 'xp-april-activity-provinces-property',
    components: {
        'xp-form': Form
    },
    props: Utils.toProps(generateConfig(provincesData)),
    data() {
        return {
            fields: Utils.toData(generateConfig(provincesData), this)
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
