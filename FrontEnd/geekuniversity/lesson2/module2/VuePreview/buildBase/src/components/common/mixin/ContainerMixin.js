import ComponentTree from 'components/platform/EditorPanel/ComponentTree'
const uuid = require('uuid/v4');

export default {
    methods: {
        setChildrenProps(cid, data, hasKey, propsKey='productData'){
            let pageData = this.$root.modelData;
            var tree = new ComponentTree(pageData);
            let node = tree.find(cid);

            let index = 0;
            for(var i=0; i<node.children.length; i++){
                let child = node.children[i];
                if(child.props[hasKey]){
                    child.props[propsKey] = data[index];
                    index++;
                }
            }
            eventHub.$emit('xp-set-global-data', pageData);
        },

        repeatChild(cid, data, propsKey='productData'){
            let pageData = this.$root.modelData;
            var tree = new ComponentTree(pageData);
            let node = tree.find(cid);
            if(node.children.length > 0){
                node.children.length = 1;
                node.children[0].props[propsKey] = data[0];

                for(var i=1; i<data.length; i++){
                    let newChild = JSON.parse(JSON.stringify(node.children[0]));
                    newChild.cid = ++this.$root.uid + '-' + uuid();
                    newChild.props[propsKey] = data[i];
                    node.children.push(newChild);
                }
            }
            eventHub.$emit('xp-set-global-data', pageData);
        },

        getChildrenProps(cid, propsKey){
            let pageData = this.$root.modelData;
            var tree = new ComponentTree(pageData);
            let node = tree.find(cid);

            let result = [];
            for(var i=0; i<node.children.length; i++){
                let child = node.children[i];
                let v = child.props[propsKey];
                if(v !== undefined){
                    result.push(v);
                }
            }
            return result;
        }
    }
}