# TGU 库使用
本仓库为喜马拉雅在线教育事业部产研中台前端技术公用库

## 使用

1. 安装依赖
<code>npm install</code>

2. 新建开发分支 - 参见下面的分支规范

  从master切出一个新分支进行开发，小功能就在本地发开测试完成之后再进行合并操作，大功能可以把分支push到远程，避免远程分支过多而产生干扰

3. 新建一个包
<code>lerna create PackageName(自定义的包名)</code>

4. 命令交互
    1. 为了跟不跟其他的包名冲突，在前面加上组织名字<code>@tgu/PackageName</code>
    2. 然后接下来就可以自定义了version/description等信息了。一般为了简单，都一路回车到底

5. 修改入口文件
  
    因为打包配置，每个包都需要有一个入口lib/index.ts，而lerna并没有提供，所以需要手动新建一个入口文件

6. 单例测试文件

    测试使用jest+enzyme+enzyme-adapter-react-16来实现，也要用typescript编写

    <code>npm run test</code> 执行测试

7. 编写使用文档

    使用docz来做一个文档，在lib/目录下，新建一个xxx.md文件，具体用法参照docz官方文档

    <code>npm run docz</code> 打开接口文档地址

8. 发布包

    <code>npm run publish</code>

9. 打包接口文档

    <code>npm run docz:build</code>

## 分支规范

* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动

## lerna 常用指令使用说明

1. 创建包 lerna create [packageName] [scope] (包名，空间)

2. 发布包 lerna publish

* 发布自上次发布以来有更新的包 lerna publish
* 显示发布当前提交中标记的包 lerna publish from-git
* 显示发布npm registry中不存在的最新版本的包 lerna publish from-package

3. 初始化一个lerna项目 lerna init [----independent] (独立模式)

4. 导入存在的包 lerna import (lerna import ~/component --dest=hooks 把路径为component的包导入到名为hooks的包里)

5. 将本地或者远程的包作为依赖项添加到当前的packages中 lerna add [packageName] --scope=[modules] [--dev] 把远程依赖[packageName]到[modules]的[开发]依赖库中

6. 删除包下的node_modules目录 lerna clean [--scope=packageName] 删除[packageName]下的node_modules依赖

7. 列出所有的公开包（排除private=true） lerna ls

9. 检查包更新 lerna changed

10. 查看包的diff变化 lerna diff

11. 在包含该脚本命令的每个package内部执行npm script脚本命令,也可以指定在某个package下执行 lerna run [instruction] [--scope=packageName]

12. 对每个包执行任意的命令 lerna exec

13. 版本迭代 lerna version

## 各个包介绍

1. components 日常开发中常用到的react组件

2. hooks 日常开发中常用的react-hooks

3. utils 日常开发中常用到的工具方法

