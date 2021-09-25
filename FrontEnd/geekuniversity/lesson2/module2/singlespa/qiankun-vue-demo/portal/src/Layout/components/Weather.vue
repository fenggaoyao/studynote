<template>
  <div class="weather-box">
    <template v-if="weatherInfo.weather">
      <div class="weather-box-img">
        <img v-if="img" :src="img" :title="weatherInfo.weather" :alt="weatherInfo.weather">
      </div>
      <div class="weather-info">
        <p>{{ weatherInfo.temperature }}℃ / 湿度: {{ weatherInfo.humidity }}</p>
        <p>{{ weatherInfo.province }} {{ weatherInfo.city }}</p>
      </div>
    </template>
    <span v-else>天气获取中...</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: '',
      weatherInfo: {}
    }
  },
  mounted() {
    this.getCity()
  },
  methods: {
    getCity() {
      const that = this
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
        })
        geolocation.getCurrentPosition(function(status,result){
            if(status=='complete') {
              var geocoder = new AMap.Geocoder()
              geocoder.getAddress([result.position.lng, result.position.lat], function(status1, result1) {
                if (status1 === 'complete'&&result1.regeocode) {
                  const { province, city, district } = result1.regeocode.addressComponent
                  that.getWeather(province, city, district)
                }
              })
            }
        })
      })
    },
    getWeather(province, city, district) {
      const that = this
      AMap.plugin('AMap.Weather', function() {
        var weather = new AMap.Weather()
        weather.getLive(city, function(err, data) {
          if (!err) {
            const { weather, temperature, humidity, province, city } = data
            that.weatherInfo = { weather, temperature, humidity, province, city }
            that.img = weather ? require(`@/assets/images/weather/${weather}.png`) : ''
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.weather-box {
  display: flex;
  align-items: center;
  &-img {
    height: 30px;
    img {
      width: 30px;
      filter: drop-shadow(0 0 4px #ddd);
      display: block;
    }
  }
  div:last-child {
    padding-left: 10px;
  }
  p {
    margin: 0;
    height: 20px;
    line-height: 20px;
    color: #656565;
    font-size: 13px;
    text-shadow: 1px 1px #f7f7f7;
  }
  span {
    color: #999;
    font-size: 13px;
  }
}
@media screen and (max-width: 500px){
  .weather-box {
    display: none!important;
  }
}
</style>
