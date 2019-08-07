使用cra-3.0启动项目时发生错误

```
TypeError: fsevents is not a constructor
```

一脸懵逼
重装依赖发现了错误信息

```
gyp: No Xcode or CLT version detected!
```

遂找xcode，执行

```
sudo xcode-select --install
```

一番安装之后问题解决