var util = require('util');
var MongoClient = require('mongodb').MongoClient;
const mongo_url = 'mongodb://localhost/';
const mongo_dbname = 'mongo_test';
const collection_name = 'memo';

let client;

const connectDB = async() => {
  if(!client)
    client = await MongoClient.connect(mongo_url,
       { useNewUrlParser: true, useUnifiedTopology: true,  connectTimeoutMS: 5000});
}

const db = () => { return client.db(mongo_dbname); }

// １つデータを追加する
const create = async (title, message) => {
  await connectDB();
  const collection = db().collection(collection_name);
  await collection.insertOne({ title: title, message: message });
  //console.log('create done');
}

// データをアップデートする
const update = async (title, message) => {
  await connectDB();
  const collection = db().collection(collection_name);
  await collection.updateOne(
    { title: title },
    { $set: { title: title, message: message } });
  //console.log('update done');
}

// データを１つ読み込む
const read = async (title) => {
  await connectDB();
  const collection = db().collection(collection_name);
  const data = await collection.findOne({ title: title });
  console.log(`data = ${util.inspect(data)}`);
  //console.log('read done');
}

// 全データを読む
const readall = async () => {
  await connectDB();
  const collection = db().collection(collection_name);
  const docs = await new Promise((resolve, reject) => {
    var docs = [];
    collection.find({}).forEach(
      doc => { docs.push(doc); },
      err  => {
        if (err) reject(err);
        else resolve(docs);
      }
    );
  });
  console.log(`data = ${util.inspect(docs)}`);
  //console.log('readall done');
}

// データを削除する
const destroy = async (title) => {
  await connectDB();
  const collection = db().collection(collection_name);
  const doc = await collection.findOne({ title: title });
  if (!doc) {
    throw new Error(`No data found for ${title}`);
  } else {
    await collection.findOneAndDelete({ title: title });
  }
  //console.log('destroy done');
}

async function close() {
  if (client) client.close();
  client = undefined;
  //console.log('close done');
}

(async () => {
  try {
    console.log('********* Add 3 items *********');
    await create('yesterday', 'go to school');
    await create('today', 'watch a movie');
    await create('tomorrow', 'play baseball');
    await readall();

    console.log('******** update 1 item *********');
    await update('today', 'watch TV');
    await readall();

    console.log(' ******** select 1 item *********');
    await read('tomorrow');

    console.log('******** delete 1 item *********');
    await destroy('today');
    await readall();
  } catch(err) {
    console.log('******** error handling *********');
    console.error(err);
  } finally {
    console.log('********* all tests done *********');
    await close();
  }
})();
