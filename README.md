# 知识点记录

## 解决的问题

1. 自动解决 packages 之间的依赖关系
2. 通过 git 检测文件改动，自动发布
3. 根据 git 提交记录，自动生成 CHANGELOG

## `--hoist` 或在 `lerna.json` 里配置 `hoist` 为 `true`

可以将每个包的公共依赖都安装到根目录的 node_modules 里  
但是我发现非公共依赖也会安装到根目录？

## Mode - Fixed or Independent
- Fixed
- Independent

## 参考链接

[Lerna Hoisting](https://github.com/lerna/lerna/blob/main/doc/hoist.md)

[lerna 管理前端模块最佳实践](https://juejin.cn/post/6844903568751722509)
