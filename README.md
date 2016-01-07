# 说明

首先安装所需的库:

```
npm install
```

然后，运行：

```
npm start
```

如在运行时出现如下错误：

```
{ [Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 'MODULE_NOT_FOUND' }
```

可删除`node_modlues`后用如下命令重新安装所需库：

```
npm install --no-optional
```