# Node.jsでnode-mongodb-nativeを使ってMongoDB

Node.jsからMongoDBに接続して扱うにはいくつか利用できるパッケージがあるようだが、 今回は標準的なnode-mongodb-nativeを利用するサンプル。

https://github.com/mongodb/node-mongodb-native - node-mongodb-native


## 実行手順

本サンプルではMongoDBを使っているので、MongoDBのインストールと起動を事前に行っておく必要がある。

その上で、以下のように実行。

```txt
$$ node mongotest.js
********* Add 3 items *********
data = [
  {
    _id: 5fba15a745613070bb19c8af,
    title: 'yesterday',
    message: 'go to school'
  },
  {
    _id: 5fba15a745613070bb19c8b0,
    title: 'today',
    message: 'watch a movie'
  },
  {
    _id: 5fba15a745613070bb19c8b1,
    title: 'tomorrow',
    message: 'play baseball'
  }
]
******** update 1 item *********
data = [
  {
    _id: 5fba15a745613070bb19c8af,
    title: 'yesterday',
    message: 'go to school'
  },
  {
    _id: 5fba15a745613070bb19c8b0,
    title: 'today',
    message: 'watch TV'
  },
  {
    _id: 5fba15a745613070bb19c8b1,
    title: 'tomorrow',
    message: 'play baseball'
  }
]
 ******** select 1 item *********
data = {
  _id: 5fba15a745613070bb19c8b1,
  title: 'tomorrow',
  message: 'play baseball'
}
******** delete 1 item *********
data = [
  {
    _id: 5fba15a745613070bb19c8af,
    title: 'yesterday',
    message: 'go to school'
  },
  {
    _id: 5fba15a745613070bb19c8b1,
    title: 'tomorrow',
    message: 'play baseball'
  }
]
********* all tests done *********
```
