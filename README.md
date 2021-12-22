## 解决的问题

1. 自动解决 packages 之间的依赖关系（通过在主包的 node_modules 里增加对应依赖的软链接到源码文件夹，修改源码不用进行发布即可调试）
2. 通过 git 检测文件改动，自动发布(依赖版本自动升级)
3. 根据 git 提交记录，自动生成 CHANGELOG

## 不能解决的问题

1. 如果依赖包需要编译，比如 ts 文件，那么调试的时候需要一直打包着生成包的入口文件，可不可以通过动态 alias 来解决呢？？？
2. 不能单独发布某一个或某些包，如果使用 lerna publish，那么所有修改过代码并且 commit 了的包都会升版发布。使用 Independent 模式只能保证各个包的版本好可以不保持一致！  
   这是 github 相关 issue：
   [Question: How can I publish only one package?](https://github.com/lerna/lerna/issues/1691)

# lerna.json 推荐配置（这里使用的 npm）

```json
{
  "version": "independent",
  "npmClient": "npm",
  "packages": ["packages/*", "demo"],
  "command": {
    "bootstrap": {
      "hoist": false
    },
    "version": {
      "conventionalCommits": true
    },
    "publish": {
      "ignoreChanges": ["**/*.md"],
      "message": "chore(release): publish"
    }
  }
}
```

1. 使用 `--hoist` 或在 `lerna.json` 里配置 `hoist` 为 `true` 后，可以将每个包的公共依赖都安装到根目录的 node_modules 里，但是我发现非公共依赖也会安装到根目录？

2. mode - Fixed or Independent

- Fixed 发布新版本的时候，所有包会跟着根目录的版本走，要升一起升（默认模式）
- Independent 发布新版本的时候 所有包的版本各自管理，不会保持一致，需要将 `lerna.json` 的 `version` 改为 `independent`

# 命令

lerna 的命令有很多，但是掌握几个常用的就行，即 `bootstrap, add, version, publish`。

## bootstrap

1. 使用 `npm install` 安装所有第三方依赖
2. 软链接所有互相依赖的 lerna 包
3. npm run prepublish in all bootstrapped packages (unless --ignore-prepublish is passed).
4. npm run prepare in all bootstrapped packages.

## add

```shell
# 在本地将库安装到另一个库或包 不需要发布到 npm
lerna add @blesstowl/cli-share --scope=@blesstowl/cli
```

`lerna add --scope` 有两个注意：

1. 如果不使用 lerna 发布版本的话，@blesstowl/cli 里依赖的 @blesstowl/cli-share 版本要手动更新到 @blesstowl/cli-share 的实际版本，否则当 @blesstowl/cli 里的版本和 @blesstowl/cli-share 的实际版本不一致时会报错  
   不使用 lerna publish => npm publish @blesstowl/cli-share => 升级 @blesstowl/cli 的依赖版本 => lerna add @blesstowl/cli-share --scope=@blesstowl/cli
2. 只要上述所说的版本相同，@blesstowl/cli-share 在本地更改之后，重新运行 `lerna add --scope` node_modules 里的代码也会更改，即 add 命令就是直接把整个包复制到指定包的 node_modules 里

## version

1. Identifies packages that have been updated since the previous tagged release.
2. Prompts for a new version.
3. Modifies package metadata to reflect new release, running appropriate lifecycle scripts in root and per-package.
4. Commits those changes and tags the commit.
5. Pushes to the git remote.

_默认会 push 到远程仓库，如果不想 push，可以使用 --no-push 参数_  
_使用 --message 定制自动 commit 的 -m，也可以在 lerna.json 里配置_

## publish

1. Publish packages updated since the last release (calling [lerna version](https://github.com/lerna/lerna/tree/main/commands/version#readme) behind the scenes).
    - This is the legacy behavior of lerna 2.x
2. Publish packages tagged in the current commit (`from-git`).
3. Publish packages in the latest commit where the version is not present in the registry (`from-package`).
4. Publish an unversioned "canary" release of packages (and their dependents) updated in the previous commit.

_当 fixed 模式的时候，当改动文件后，只有 commit 之后，才能 publish， 所以 lerna 应该是根据 git commit 来确定是否能发版本的。即当最新 commit 与最新版本的 commit 的不一致时，就可以发版本，并且会将根目录和所有包的 version 都加 1/0.0.1_

# 最佳实践

- 采用 Independent 模式
- lerna.json 添加 message 来自定义 version 命令生成的 message 记录
- 根据 Git 提交信息，自动生成 changelog
- eslint 规则检查
- prettier 自动格式化代码
- 提交代码，代码检查 hook
- 遵循 semver 版本规范

# 参考链接

[Lerna](https://github.com/lerna/lerna)

[Lerna Hoisting](https://github.com/lerna/lerna/blob/main/doc/hoist.md)

[lerna 管理前端模块最佳实践](https://juejin.cn/post/6844903568751722509)

[基于 lerna 和 yarn workspace 的 monorepo 工作流](https://zhuanlan.zhihu.com/p/71385053)
