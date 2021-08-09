 public class Demo
    {
       
        //协变
        // public delegate T GetValue<T>();
        // public interface IEnumerable<out T>{
        //  IEnumerator<T> GetEnumertor() }
        public void Test()
        {
            ITest<Fruit> fruit = new Test<Apple>();
            PrintFruits(fruit);
        }
        public void PrintFruits(ITest<Fruit> test)
        {
            Console.WriteLine(test.MethodA());
        }

        //逆变
        // public void SetValue<T>(T t);
        public void Test2()
        {
            ITest2<Apple> test = new Test2<Fruit>();
            PrintFruits2(test);

        }
        public void PrintFruits2(ITest2<Apple> test)
        {
            test.SetValue(new Apple());
        }



    }

    public class Test<T> : ITest<T>
    {
        public T MethodA()
        {
            throw new NotImplementedException();
        }
    }

    public interface ITest<out T> {
        T MethodA();
    }



    public class Test2<T> : ITest2<T>
    {
        public void SetValue(T t)
        {
            throw new NotImplementedException();
        }
    }
    public interface ITest2<in T>
    {
        void SetValue(T t);        
    }


    public class Fruit{}
    public class Apple : Fruit { }