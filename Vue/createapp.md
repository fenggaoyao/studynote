creatapp 参数接受是的 PublicAPIComponent
它是 ComponentOptions|FunctionalComponent，以及带有 new 构造器类型

ThisType 指向的类型是当前这个子类（继承情况下）的类型，具有动态性，避免了在父类的时候把类型直接规定死, 使得在编写父类的时候，可以引用子类（占位）；

条件类型
T extends U ?never:T : 如果 T 可以继承给 U,就是 never 类型，否则是 T 类型

映射类型，》新类型 （同态）
如 readonly pick

另一种是非同态
Record<新属性,obj>
