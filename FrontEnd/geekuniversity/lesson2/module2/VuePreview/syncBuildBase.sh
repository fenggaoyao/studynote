pwd

rm -rf ./buildBase/src
rm -rf ./buildBase/isomorph
rm -rf ./buildBase/public
rm -rf ./buildBase/node_modules

cp -R ./src ./buildBase/src
cp -R ./isomorph ./buildBase/isomorph 
cp -R ./public ./buildBase/public 
cp -R ./node_modules ./buildBase/node_modules 

rm -rf ./buildBase/src/components/business/*
rm -rf ./buildBase/src/components/upload/*
rm -rf ./buildBase/src/components/common/*
rm -rf ./buildBase/src/components/platform/*

mkdir ./buildBase/src/components/platform/EditorPanel
cp ./src/components/platform/EditorPanel/ComponentTree.js ./buildBase/src/components/platform/EditorPanel 

echo done