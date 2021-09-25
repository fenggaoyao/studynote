using Castle.DynamicProxy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace aop
{
    public interface ICoding
    {
        void DoSth();
    }
    public class Coding : ICoding
    {
        public virtual void DoSth()
        {
            Console.WriteLine("敲代码咯！");
        }
    }
    public class Architecture : Coding
    {
        public override void DoSth()
        {
            Console.WriteLine("架构设计！");
            base.DoSth();
        }
    }

    public class MyInterceptor : IInterceptor
    {
        public void Intercept(IInvocation invocation)
        {
            before();
            if (invocation.InvocationTarget != null)
            {
                invocation.Proceed();
            }
            after();
        }

        private void before()
        {
            Console.WriteLine("需求分析！");
        }
        private void after()
        {
            Console.WriteLine("测试！");
        }
    }

    public class MyInterceptor2 : IInterceptor
    {
        public void Intercept(IInvocation invocation)
        {
            before();
            if (invocation.InvocationTarget != null)
            {
                invocation.Proceed();
            }
            after();
        }

        private void before()
        {
            Console.WriteLine("需求分析2！");
        }
        private void after()
        {
            Console.WriteLine("测试2！");
        }
    }

    public interface IAddItem
    {
        void AddItem();
    }

    public class AnotherItem : IAddItem
    {
        public void AddItem()
        {
            Console.WriteLine("另一个项目开始了！");
        }
    }
}
