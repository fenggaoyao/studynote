# 需求

1、实体审计需求
创建
删除
修改

2、组合：（用户）
IAuditedObject：ICreationAuditedObject，IModificationAuditedObject
IFullAuditedObject

3、服务的审计日志，在服务操作时记录，可以使用拦截器
哪些服务

4、EntityPropertyChangeInfo ，在持久化保存时调用


