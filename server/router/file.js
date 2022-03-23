const node_xlsx = require('node-xlsx');
const { writeFileSync, stat } = require('fs');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/../uploads' });
const assert = require('http-assert');
const dataSchema = require('../models/Data');
const customerSchema = require('../models/Customer');
const agentSchema = require('../models/Agent');
const logSchema = require('../models/Log');

module.exports = (app) => {
  app.post('/uploads', upload.single('file'), async (req, res) => {
    const file = req.file;
    res.send(file);
  });
  app.get('/file', async (req, res) => {
    let searchModel = {};
    let model = [];
    let data = [];
    const path = __dirname + '/../public/downloads/';

    switch (req.query.path) {
      case 'data':
        if (req.query.phone != '') {
          searchModel.phone = req.query.phone;
        }
        if (req.query.note != '') {
          searchModel.note = req.query.note;
        }
        if (req.query.historyRepect && req.query.historyRepect != 'false') {
          searchModel.historyRepect = { $gt: 0 };
        } else {
          searchModel.historyRepect = 0;
        }
        if (req.query.creatTime != 0) {
          searchModel.creatTime = req.query.creatTime;
        }
        model = await dataSchema.find(searchModel).sort({ _id: -1 });
        data.push(['电话号码']);
        model.forEach((rows) => {
          data.push([rows.phone]);
        });
        break;

      case 'agent':
        if (req.query.phone != '') {
          searchModel.phone = req.query.phone;
        }
        if (req.query.note != '') {
          searchModel.note = req.query.note;
        }
        if (req.query.tencent != '') {
          searchModel.tencent = req.query.tencent;
        }
        if (req.query.agent != '') {
          searchModel.agent = req.query.agent;
        }
        if (req.query.historyRepect && req.query.historyRepect != 'false') {
          searchModel.historyRepect = { $gt: 0 };
        } else {
          searchModel.historyRepect = 0;
        }
        if (req.query.creatTime != 0) {
          searchModel.creatTime = req.query.creatTime;
        }
        model = await agentSchema.find(searchModel).sort({ _id: -1 });
        data.push(['电话号码', 'QQ/微信', '对应电销']);
        model.forEach((rows) => {
          data.push([rows.phone, rows.tencent, rows.agent]);
        });
        break;

      case 'customer':
        if (req.query.date != '') {
          searchModel.date = req.query.date;
        }
        if (req.query.group != '') {
          searchModel.group = req.query.group;
        }
        if (req.query.account != '') {
          searchModel.account = req.query.account;
        }
        if (req.query.agent != '') {
          searchModel.agent = req.query.agent;
        }
        if (req.query.platform != '') {
          searchModel.platform = req.query.platform;
        }
        if (req.query.subPlatform != '') {
          searchModel.subPlatform = req.query.subPlatform;
        }
        if (req.query.source != '') {
          searchModel.source = req.query.source;
        }
        if (req.query.types != '') {
          searchModel.types = req.query.types;
        }
        if (req.query.price != '') {
          searchModel.price = req.query.price;
        }
        if (req.query.phone != '') {
          searchModel.phone = req.query.phone;
        }
        if (req.query.qq != '') {
          searchModel.qq = req.query.qq;
        }
        if (req.query.wechat != '') {
          searchModel.wechat = req.query.wechat;
        }
        if (req.query.game != '') {
          searchModel.game = req.query.game;
        }
        if (req.query.other != '') {
          searchModel.other = req.query.other;
        }
        if (req.query.note != '') {
          searchModel.note = req.query.note;
        }
        if (req.query.creatTime != 0) {
          searchModel.creatTime = req.query.creatTime;
        }
        model = await customerSchema.find(searchModel).sort({ _id: -1 });
        data.push([
          '日期',
          'Group',
          '账户',
          '推广',
          '平台',
          '来源渠道',
          '首存/注册',
          '充值',
          '电话',
          'QQ',
          '微信',
          '游戏',
          '备注/分线',
          '备注/其他',
        ]);
        model.forEach((rows) => {
          data.push([
            rows.date,
            rows.group,
            rows.account,
            rows.agent,
            rows.platform,
            rows.source,
            rows.types,
            rows.price,
            rows.phone,
            rows.qq,
            rows.wechat,
            rows.game,
            rows.subPlatform,
            rows.other,
          ]);
        });
        break;

      default:
        break;
    }
    let buffer = node_xlsx.build([
      {
        name: 'sheet1',
        data: data,
      },
    ]);
    res.send(buffer);
  });
  app.post('/file', async (req, res) => {
    assert(req.body.fileName, 400, '请重新上传文件');
    const filePath = __dirname + '/../uploads/' + req.body.fileName;
    const obj = node_xlsx.parse(filePath);
    const data = obj[0].data;
    const length = data.length;
    let message = '添加成功';

    switch (req.body.types) {
      case 'customer':
        let customerLog = {
          note: req.body.note,
          count: 0,
          fileRepect: 0,
          types: '客户',
        };
        for (let i = 1; i < length; i++) {
          if (data[i][0]) {
            customerLog.count++;
            const model = {
              date: data[i][0]
                ? new Date(1900, 0, data[i][0] - 1).toLocaleDateString()
                : '',
              group: data[i][1] ? data[i][1] : '',
              account: data[i][2] ? data[i][2] : '',
              agent: data[i][3] ? data[i][3] : '',
              platform: data[i][4] ? data[i][4] : '',
              subPlatform: data[i][12] ? data[i][12] : '',
              source: data[i][5] ? data[i][5] : '',
              types: data[i][6] ? data[i][6] : '',
              price: data[i][7] ? String(data[i][7]) : '0',
              phone: data[i][8] ? String(data[i][8]) : '',
              qq: data[i][9] ? String(data[i][9]) : '',
              wechat: data[i][10] ? String(data[i][10]) : '',
              game: data[i][11] ? data[i][11] : '',
              other: data[i][13] ? data[i][13] : '',
              note: req.body.note,
            };
            await customerSchema.create(model);
          }
        }
        await logSchema.create(customerLog);
        break;

      case 'agent':
        let agentLog = {
          note: req.body.note,
          count: 0,
          fileRepect: 0,
          types: '电销',
        };
        for (let i = 1; i < length; i++) {
          if (data[i][0]) {
            agentLog.count++;
            // 查询数据库中是否有这个号码
            const existedData = await dataSchema
              .findOne({
                phone: String(data[i][0]),
              })
              .select({ phone: 1 })
              .lean();

            if (!existedData) {
              // 如果没有直接存入
              const model = {
                phone: String(data[i][0]),
                tencent: data[i][1] ? String(data[i][1]) : '',
                agent: data[i][2] ? data[i][2] : '',
                note: req.body.note,
                historyRepect: 0,
              };
              await agentSchema.create(model);
            } else {
              // 如果有则当前重复加1，历史重复加1
              agentLog.fileRepect++;
              await agentSchema.findOneAndUpdate(existedData.phone, {
                $inc: { historyRepect: 1 },
              });
            }
          }
        }
        await logSchema.create(agentLog);
        break;

      case 'data':
        let dataLog = {
          note: req.body.note,
          count: 0,
          fileRepect: 0,
          types: '数据',
        };
        for (let i = 1; i < length; i++) {
          if (data[i][0]) {
            dataLog.count++;
            // 查询数据库中是否有这个号码
            const existedData = await dataSchema
              .findOne({
                phone: String(data[i][0]),
              })
              .select({ phone: 1 })
              .lean();

            if (!existedData) {
              // 如果没有直接存入
              const model = {
                phone: String(data[i][0]),
                note: req.body.note,
                historyRepect: 0,
              };
              await dataSchema.create(model);
            } else {
              // 如果有则当前重复加1，历史重复加1
              dataLog.fileRepect++;
              await dataSchema.findOneAndUpdate(existedData.phone, {
                $inc: { historyRepect: 1 },
              });
            }
          }
        }
        await logSchema.create(dataLog);
        break;

      default:
        message = '添加失败';
        break;
    }
    res.send({ message });
  });
};
