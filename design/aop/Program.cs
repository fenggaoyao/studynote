using Castle.DynamicProxy;
using System;
using Newtonsoft.Json;
using System.Collections;
using System.Collections.Generic;

namespace aop
{
    class Program
    {
        static void Main(string[] args)
        {
            //ClassProxy();

            //ClassProxyWithTarget();

            //InterfaceProxyWithoutTarget();

            //InterfaceProxyWithTarget();
            //InterfaceProxyWithTargetInterface();

            //Mixin();
            var item = new Item() { Count="5"  };
           
            var  resultStr = new List<Item>();
            resultStr.Add(item);

          

            var result= JsonConvert.SerializeObject(resultStr);

            var obj = Deseriaze<List<Item>>(result);

            //JsonConvert.DeserializeObject<TResponse>(resultStr)
        }


        public static T Deseriaze<T>(string obj) where T:IList
        {
           return  JsonConvert.DeserializeObject<T>(obj);
        }



        public class Item
        { 
            public string Count { get; set; }
        }

        

        static void ClassProxy()
        {
            Console.WriteLine("\n*************ClassProxy*************\n");
            var generator = new ProxyGenerator();
            var ProjectDevelopment = generator.CreateClassProxy<Coding>(
                new MyInterceptor(),
                new MyInterceptor2()
                );

            ProjectDevelopment.DoSth();

            Print(ProjectDevelopment);
        }

        static void ClassProxyWithTarget()
        {
            Console.WriteLine("\n*************ClassProxyWithTarget*************\n");
            var generator = new ProxyGenerator();
            var ProjectDevelopment = generator.CreateClassProxyWithTarget<Coding>(
                new Architecture(),
                new MyInterceptor(),
                new MyInterceptor2()
                );
            ProjectDevelopment.DoSth();

            Print(ProjectDevelopment);
        }

        static void InterfaceProxyWithTarget()
        {
            Console.WriteLine("\n*************InterfaceProxyWithTarget*************\n");
            var generator = new ProxyGenerator();
            var ProjectDevelopment = generator.CreateInterfaceProxyWithTarget<ICoding>(
                new Architecture(),
                new MyInterceptor(),
                new MyInterceptor2()
                );
            ProjectDevelopment.DoSth();

            Print(ProjectDevelopment);
        }

        static void InterfaceProxyWithoutTarget()
        {
            Console.WriteLine("\n*************InterfaceProxyWithoutTarget*************\n");
            var generator = new ProxyGenerator();
            var ProjectDevelopment = generator.CreateInterfaceProxyWithoutTarget<ICoding>(
                new MyInterceptor(),
                new MyInterceptor2()
                );
            ProjectDevelopment.DoSth();

            Print(ProjectDevelopment);
        }
        static void InterfaceProxyWithTargetInterface()
        {
            Console.WriteLine("\n*************InterfaceProxyWithTargetInterface*************\n");
            var generator = new ProxyGenerator();
            var ProjectDevelopment = generator.CreateInterfaceProxyWithTargetInterface<ICoding>(
                new Architecture(),
                new MyInterceptor(),
                new MyInterceptor2()
                );
            ProjectDevelopment.DoSth();

            Print(ProjectDevelopment);
        }

        static void Mixin()
        {
            Console.WriteLine("\n*************CreateClassProxy Mixin*************\n");
            var generator = new ProxyGenerator();
            var options = new ProxyGenerationOptions();
            options.AddMixinInstance(new AnotherItem());

            var ProjectDevelopment = generator.CreateClassProxy<Coding>(
                options,
                new MyInterceptor(),
                new MyInterceptor2()
                );
            ProjectDevelopment.DoSth();
            Console.WriteLine("\n");
            (ProjectDevelopment as IAddItem).AddItem();

            Print2(ProjectDevelopment);
        }
        static void Print(object o)
        {
            Console.WriteLine();
            Console.WriteLine("GetType()：".PadRight(30) + o.GetType());
            Console.WriteLine("GetType().BaseType：".PadRight(30) + o.GetType().BaseType);

            var compositeField = o.GetType().GetField("__target");
            Console.WriteLine("__target：".PadRight(30) + compositeField?.FieldType + ", " + compositeField?.Name);

            foreach (var interfaceType in o.GetType().GetInterfaces())
            {
                Console.WriteLine("GetType().GetInterfaces()：".PadRight(30) + interfaceType);
            }

            foreach (var a in (o as IProxyTargetAccessor).GetInterceptors())
            {
                Console.WriteLine("GetInterceptors()：".PadRight(30) + a);
            }
        }

        static void Print2(object o)
        {
            Console.WriteLine();
            Console.WriteLine("GetType()：".PadRight(30) + o.GetType());
            Console.WriteLine("GetType().BaseType：".PadRight(30) + o.GetType().BaseType);

            var compositeField = o.GetType().GetField("__target");
            Console.WriteLine("__target：".PadRight(30) + compositeField?.FieldType + ", " + compositeField?.Name);

            foreach (var field in o.GetType().GetFields())
            {
                if (field.Name.StartsWith("__mixin"))
                {
                    Console.WriteLine("GetType().GetFields()：".PadRight(30) + field?.FieldType + ", " + field?.Name);
                }
            }

            foreach (var interfaceType in o.GetType().GetInterfaces())
            {
                Console.WriteLine("GetType().GetInterfaces()：".PadRight(30) + interfaceType);
            }

            foreach (var a in (o as IProxyTargetAccessor).GetInterceptors())
            {
                Console.WriteLine("GetInterceptors()：".PadRight(30) + a);
            }
        }


    }
}
