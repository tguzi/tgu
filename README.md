# TGU 库使用

本仓库为开源项目，旨在通过平时的开发积累，总结经验，减少重复的工作，欢迎广大开发者共建

## 使用

1. 安装依赖
<code>npm install</code>

2. 新建开发分支 - 参见下面都分支规范

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

    使用docz来做一个文档，在lib/目录下，新建一个xxx.mdx文件，具体用法参照docz官方文档

    <code>npm run docz</code> 打开接口文档地址

8. 发布包

    开发完成之后，代码合并到master分支，并且提一个pull_request拉取请求

## 分支规范

* feat：新功能（feature）
* fix：修补bug
* docs：文档（documentation）
* style： 格式（不影响代码运行的变动）
* refactor：重构（即不是新增功能，也不是修改bug的代码变动）
* test：增加测试
* chore：构建过程或辅助工具的变动


## 各个包介绍

1. components 日常开发中常用到的react组件

2. hooks 日常开发中常用的react-hooks

3. utils 日常开发中常用到的工具方法

4. validate 日常开发中会用到的正则校验方法


## components

1. 安装： <code>npm install @tgu/components</code>
2. [文档地址](./Component) 

## hooks

1. 安装： <code>npm install @tgu/hooks</code>
2. [文档地址](./Component) 

## utils

1. 安装： <code>npm install @tgu/utils</code>
2. [文档地址](./Component) 

