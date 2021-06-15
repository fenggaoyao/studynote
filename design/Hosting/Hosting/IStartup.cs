using System;
using System.Collections.Generic;
using System.Text;

namespace Hosting
{
    public interface IStartup
    {
        void Configure(IApplicationBuilder app);
    }

    public class DelegateStartup : IStartup
    {
        private Action<IApplicationBuilder> configure;
        public DelegateStartup(Action<IApplicationBuilder> configure)
        {
            this.configure = configure;
        }

        public void Configure(IApplicationBuilder app)
        {
            this.configure(app);
        }
    }
}
