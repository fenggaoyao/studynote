# Location
 使用了中间件app.UseAbpRequestLocalization()
 这里增加一个委托，是IAbpRequestLocalizationOptionsProvider（DefaultAbpRequestLocalizationOptionsProvider ）对RequestLocalizationOptions的操作。

 RequestLocalizationOptions
 > DefaultRequestCulture  查看Abp.Localization.DefaultLanguage  
     "Abp.Localization.DefaultLanguage": "zh-Hans;zh-Hans",分别是
 > SupportedCultures 
 > SupportedUICultures 
