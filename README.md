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

## Publish
1. 当 fixed 模式的时候，当改动文件后，只有 commit 之后，才能 publish， 所以 lerna 应该是根据 git commit 来确定是否能发版本的。即当最新 commit 与最新版本的 commit 的不一致时，就可以发版本，并且会将根目录，所有包的 version 都加 1/0.0.1

## 参考链接

[Lerna Hoisting](https://github.com/lerna/lerna/blob/main/doc/hoist.md)

[lerna 管理前端模块最佳实践](https://juejin.cn/post/6844903568751722509)
