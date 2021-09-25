import http from '../request';

export default {
/*------------Model--------------------------------------------------
    model_name: "2",
    model_path: "11111111111111111111111",
    model_content: "1111111111111111111111",
    model_doc: null,
    model_image: null,
    model_category: "1",
    model_discription: "1",
    model_is_public: "1", //1:共享0:不共享
    model_is_common: "1", //1：通用0：不通用
*/
    addModel(data){
        return http.post({
            url: '/templet/addmodel',
            data: data
        });
    },
    updateModel(data){
        return http.post({
            url: '/templet/updatemodel',
            data: data
        });
    },
    getModel(mid){
        return http.get({
            url: '/templet/getmodel',
            param: {
                model_id: mid
            }
        });
    },
    getModelList(){
        return http.get({
            url: '/templet/modellist'
        })
    },
    copyModel(mid){
        return http.post({
            url: '/templet/copymodel',
            data: {
                model_id: mid
            }
        })
    },
    deleteModel(mid){
        return http.post({
            url: '/templet/deletemodel',
            data: {
                model_id: mid
            }
        })
    },
    snapShot(mid){
        return http.get({
            url: '/api/snapshot',
            param: {
                modelId: mid
            }
        });
    },
    build(data){
        return http.post({
            url: '/api/build',
            data: {
                modelData: data
            }
        });
    },

/*------------widget--------------------------------------------------
    widget_name: "2",
    widget_path: "11111111111111111111111",
    widget_content: "1111111111111111111111",
    widget_doc: null,
    widget_image: null,
    widget_category: "1",
    widget_discription: "1",
    widget_is_public: "1",  //1:共享0:不共享
    widget_is_common: "1",  //1：通用0：不通用
*/
    addWidget(data){
        return http.post({
            url: '/templet/addmodel',
            data: data
        });
    },
    updateWidget(data){
        return http.post({
            url: '/templet/updatemodel',
            data: data
        });
    },
    getWidget(mid){
        return http.get({
            url: '/templet/getmodel',
            param: {
                model_id: mid
            }
        });
    },
    getWidgetList(){
        return http.get({
            url: '/templet/modellist'
        })
    },
    copyWidget(mid){
        return this.post({
            url: '/templet/copymodel',
            data: {
                model_id: mid
            }
        })
    },
    deleteWidget(mid){
        return this.post({
            url: '/templet/deletemodel',
            data: {
                model_id: mid
            }
        })
    },

/*------------component--------------------------------------------------
    component_name:"dfjkdfj",
    component_path:"http://dfhdjfhjkdsfhj",
    component_version:"1.1",
    component_catagory:"1.1",
    component_doc:"http://",
    component_image:"http://",
    component_discription:"",
    component_is_public:1 //1:共享0:不共享
    component_is_common:1 //1：通用0：不通用
*/
    addComponent(data){
        return http.post({
            url: '/templet/addcomponent',
            data: data
        })
    }


}