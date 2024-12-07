# SmartCode Workshop 自动推荐系统示例应用（JavaScript + VSCode版）

## 概述

在此示例项目中，你将使用 Visual Studio Code 开发一个应用程序，该应用程序使用字典自动完成单词并提供拼写建议。
你将使用一个预先准备好的项目代码库，其中包含 字典树（trie） 数据结构 的一些初始代码和常用操作。
你将使用 **AI编码助手** 工具来帮助理解、开发和测试这些代码。

## 项目背景

作为一名资深的开发人员，你刚刚接手了这个叫做 自动推荐系统（auto-suggestion）的项目。 这个项目的特性包括通过存储一个大量单词的词库，实现快速搜索与给定前缀匹配的字词，以提供自动完成功能。另外，这个项目还支持对拼写错误的单词实施拼写建议。
你已经拿到了一个使用 字典树（trie）  数据结构 的现有代码库，该结构是一种基于树的数据结构，对于前缀匹配和自动完成非常有用。 你需要快速熟悉这个代码库并对其进行扩展才能满足项目组对于自动推荐系统的需求。

## 实验目标

此动手实验的目标是通过一个真实项目的开发过程，让初次接触  **AI编码助手**  的用户了解 AI编码助手 的工作机制，并通过可操作的场景体验与 AI编码大模型 进行交互的方式和操作技巧。
同时，在这个实验过程中，我们对 **AI编码助手** 系统的部分特性进行操作演示和指导，确保用户了解如何操作 **AI编码助手** 系统。

具体来说，本实验希望达到如下目标
- 帮助用户快速上手，了解 **AI编码助手** 安装，登录和工具的基本配置；
- 帮助用户了解使用 **AI编码助手** 进行代码生成，代码解释，注释和文档生成，单元测试生成等基本操作；
- 帮助用户了解正确构造提示词和上下文的基本技巧，达到提高代码生成准确率的而目标
- 帮助用户了解使用 **AI编码助手** 分析和修复代码问题的基本操作和技巧
- 帮助用户了解  **AI编码助手**  的能力边界和限制，建立正确的使用习惯和预期。

## 有关 字典树（trie）数据结构

以下说明来自 wikipedia https://zh.wikipedia.org/wiki/Trie

在计算机科学中，trie，又称前缀树或字典树，是一种有序树，用于保存关联数组，其中的键通常是字符串。与二叉查找树不同，键不是直接保存在节点中，而是由节点在树中的位置决定。一个节点的所有子孙都有相同的前缀，也就是这个节点对应的字符串，而根节点对应空字符串。一般情况下，不是所有的节点都有对应的值，只有叶子节点和部分内部节点所对应的键才有相关的值。
Trie这个术语来自于retrieval。trie的发明者Edward Fredkin把它读作/ˈtriː/ "tree"。但是，其他作者把它读作/ˈtraɪ/ "try"。

![](trie.png)

在图示中，键标注在节点中，值标注在节点之下。每一个完整的英文单词对应一个特定的整数。Trie可以看作是一个确定有限状态自动机，尽管边上的符号一般是隐含在分支的顺序中的。
键不需要被显式地保存在节点中。图示中标注出完整的单词，只是为了演示trie的原理。

## 环境需求

你需要准备以下环境以便可以顺利的完成此实验：

- Windows 10/11 或者 MacOS
- Git 2.45 以上版本以及你所熟悉的Git客户端
  - 下载地址：https://git-scm.com/
- Visual Studio Code 1.90 版本以上
  - 下载地址：https://code.visualstudio.com/
- Node.JS 开发环境和对 JavaScript 编程语言的基本了解
  - 下载地址：https://nodejs.org
  - 请使用Node v20.10.0 或者以上版本
- 熟悉类、方法、变量和逻辑语句
 
> 关于开发语言的特别说明：虽然本示例采用 JavaScript 语言，但是同样适用于任何编程语言背景的开发人员。由于 **AI编码助手** 支持基本上任何主流的开发语言，因此本示例中所展示的各种操作和技巧适用于任何开发语言环境。
> 我们另外提供基于 C# 以及 Java 实验手册。

## 实验步骤

- 练习 0 - AI编码助手的安装、配置和登录
- 练习 1 - 使用 AI编码助手 快速熟悉代码
- 练习 2 - 使用 AI编码助手 进行自动代码补全
- 练习 3 - 改进提示词让 AI编码助手 生成符合意图的代码
- 练习 4 - 使用 AI编码助手 聊天调试和修复代码
- 练习 5 - 使用 AI编码助手 生成单元测试代码
- 练习 6 - 使用 AI编码助手 生成Git提交注释

## 如何使用和运行

安装依赖

```
## 使用阿里云代理
npm config set registry https://registry.npmmirror.com
npm config get registry
## 恢复默认
npm config set registry https://registry.npmjs.org

## 安装依赖
npm install
```

运行代码

```
npm start
```

运行测试

```
npm test
```

## 联系我们

如果您在使用 **AI编码助手** 的过程中遇到任何问题，或者您有任何建议和反馈，请随时联系我们。您可以通过以下方式联系我们：

- 网址 https://leansoftx.com
- 电子邮件 info@leansoftx.com
- 微信公众号 DevOps
