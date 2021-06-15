using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hosting
{
    public interface IFeatureCollection
    {
        TFeature Get<TFeature>();
        IFeatureCollection Set<TFeature>(TFeature instance);
    }

    public class FeatureCollection : IFeatureCollection
    {
        //字典对象的Value代表特性对象，
        //Key则表示该对象的注册类型（可以是特性描述对象的真实类型、真实类型的基类或者实现的接口）
        private readonly Dictionary<Type, object> features = new Dictionary<Type, object>();
        public TFeature Get<TFeature>()
        {
            object feature;
            return features.TryGetValue(typeof(TFeature), out feature)
                ? (TFeature)feature
                : default(TFeature);
        }

        public IFeatureCollection Set<TFeature>(TFeature instance)
        {
            features[typeof(TFeature)] = instance;
            return this;
        }
    }
}
