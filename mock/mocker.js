const data = [
  { name: '奥尔良烤翅', describe: '新鲜出炉的奥尔良烤翅', money: 6, hot: 100, number: 10 },
  { name: '面点套餐', describe: '小笼包+水果+豆浆', money: 8, hot: 80, number: 0 },
  { name: '西式套餐', describe: '面包+牛奶+红尘', money: 20, hot: 30, number: 30 },
  { name: '咖喱鸡块', describe: '黑椒风味', money: 50, hot: 50, number: 20 }
]

const proxy = {

  'GET /api/list': (req, res) => {
    const { number } = req.query
    if (number === '1') data.push({ name: '肯德基', describe: '儿童早餐', money: 50, hot: 40, number: 20 })
    return res.send(data.map(e => {
      const newNumber = e.number - number < 0 ? 0 : e.number - number
      return { ...e, number: newNumber }
    }))
  },

  'GET /api/order': [
    {
      name: '奥尔良烤翅',
      describe: '新鲜出炉的奥尔良烤翅',
      money: 6,
      hot: 100,
      number: 10,
      status: 1,
      selectNumber: 5,
      userName: '张三',
      tel: '15102222222',
      address: '北京王府井',
      time: '2020-08-09 11:20:00'
    },
    {
      name: '面点套餐',
      describe: '小笼包+水果+豆浆',
      money: 8,
      hot: 80,
      number: 0,
      status: 2,
      selectNumber: 5,
      userName: '张三',
      tel: '15102222222',
      address: '北京王府井',
      time: '2010-08-09 11:20:00'
    }
  ],
  'POST /api/order': (req, res) => {
    return res.send({ status: 'success' })
  },
  'PUT /api/order': (req, res) => {
    return res.send({ status: 'success' })
  }
}
module.exports = proxy
