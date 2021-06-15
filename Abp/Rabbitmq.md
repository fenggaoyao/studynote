

direct：如果路由键完全匹配的话，消息才会被投放到相应的队列。


消费者
//1、获取连接
ConnectionPool
{
    var connection = Options.Connections.GetOrDefault(connectionName)
    connection.CreateConnection()
}
//2、声明通道
   Channel = ConnectionPool
                    .Get(ConnectionName)
                    .CreateModel();

//声明交换器
            Channel.ExchangeDeclare(
                    exchange: Exchange.ExchangeName,
                    type: Exchange.Type, 
                    durable: Exchange.Durable,
                    autoDelete: Exchange.AutoDelete,
                    arguments: Exchange.Arguments
                );


//3、声明队列

         Channel.QueueDeclare(
                    queue: Queue.QueueName,
                    durable: Queue.Durable,
                    exclusive: Queue.Exclusive,
                    autoDelete: Queue.AutoDelete,
                    arguments: Queue.Arguments
                );


//4、绑定队列到交换机，指定路由key为update
        Channel.QueueBind(
                                        queue: Queue.QueueName,
                                        exchange: Exchange.ExchangeName,
                                        routingKey: command.RoutingKey
                                    );

//5、定义队列的消费者
       var consumer = new AsyncEventingBasicConsumer(Channel);


 //6、监听队列,手动返回完成状态

     Channel.BasicConsume(
                    queue: Queue.QueueName,
                    autoAck: false,
                    consumer: consumer
                );
 //6、获取消息
 consumer.Received += HandleIncomingMessageAsync;

 Func<IModel, BasicDeliverEventArgs, Task> callback

   protected virtual async Task HandleIncomingMessageAsync(object sender, BasicDeliverEventArgs basicDeliverEventArgs)
        {
            try
            {
                foreach (var callback in Callbacks)
                {
                    await callback(Channel, basicDeliverEventArgs);
                }

                Channel.BasicAck(basicDeliverEventArgs.DeliveryTag, multiple: false);
            }
            catch (Exception ex)
            {
                try
                {
                    Channel.BasicNack(
                        basicDeliverEventArgs.DeliveryTag,
                        multiple: false,
                        requeue: true
                    );
                }
                catch { }
                
                Logger.LogException(ex);
                await ExceptionNotifier.NotifyAsync(ex);
            }
        }


使用工厂模式，将需要的参数通过工厂方法进行创建
        Consumer = MessageConsumerFactory.Create(
                new ExchangeDeclareConfiguration(
                    AbpRabbitMqEventBusOptions.ExchangeName,
                    type: "direct",
                    durable: true
                ),
                new QueueDeclareConfiguration(
                    AbpRabbitMqEventBusOptions.ClientName,
                    durable: true,
                    exclusive: false,
                    autoDelete: false
                ),
                AbpRabbitMqEventBusOptions.ConnectionName
            );

Subscribe
//routekey
     if (handlerFactories.Count == 1) //TODO: Multi-threading!
            {
                Consumer.BindAsync(EventNameAttribute.GetNameOrDefault(eventType));
            }


//生产者
 public override Task PublishAsync(Type eventType, object eventData)
        {
            var eventName = EventNameAttribute.GetNameOrDefault(eventType);
            var body = Serializer.Serialize(eventData);

            using (var channel = ConnectionPool.Get(AbpRabbitMqEventBusOptions.ConnectionName).CreateModel())
            {
                channel.ExchangeDeclare(
                    AbpRabbitMqEventBusOptions.ExchangeName,
                    "direct",
                    durable: true
                );

                var properties = channel.CreateBasicProperties();
                properties.DeliveryMode = RabbitMqConsts.DeliveryModes.Persistent;

                channel.BasicPublish(
                   exchange: AbpRabbitMqEventBusOptions.ExchangeName,
                    routingKey: eventName,
                    mandatory: true,
                    basicProperties: properties,
                    body: body
                );
            }

            return Task.CompletedTask;
        }




//backgroupjob rabbitmq

         ChannelAccessor.Channel.BasicPublish(
                exchange: "",
                routingKey: QueueConfiguration.QueueName,
                basicProperties: CreateBasicPropertiesToPublish(),
                body: Serializer.Serialize(args)
            );


//消费者
    Consumer = new AsyncEventingBasicConsumer(ChannelAccessor.Channel);
                Consumer.Received += MessageReceived;

                //TODO: What BasicConsume returns?
                ChannelAccessor.Channel.BasicConsume(
                    queue: QueueConfiguration.QueueName,
                    autoAck: false,
                    consumer: Consumer
                );

 protected virtual async Task MessageReceived(object sender, BasicDeliverEventArgs ea)
        {
            using (var scope = ServiceScopeFactory.CreateScope())
            {
                var context = new JobExecutionContext(
                    scope.ServiceProvider,
                    JobConfiguration.JobType,
                    Serializer.Deserialize(ea.Body.ToArray(), typeof(TArgs))
                );

                try
                {
                    await JobExecuter.ExecuteAsync(context);
                    ChannelAccessor.Channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                }
                catch (BackgroundJobExecutionException)
                {
                    //TODO: Reject like that?
                    ChannelAccessor.Channel.BasicReject(deliveryTag: ea.DeliveryTag, requeue: true);
                }
                catch (Exception)
                {
                    //TODO: Reject like that?
                    ChannelAccessor.Channel.BasicReject(deliveryTag: ea.DeliveryTag, requeue: false);
                }
            }
        }

