using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hosting
{
    public delegate Task RequestDelegate(HttpContext context);
}
