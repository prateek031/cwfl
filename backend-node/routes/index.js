var express = require('express');
var router = express.Router();
const moment = require('moment');
const cors = require('cors');
const app = express();
app.use(express.json());

/* GET home page. */
app.use(cors({
  methods: 'POST',
  allowedHeaders: 'Content-Type',
}));
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/calculate-difference', (req, res) => {
  try {
    const { timestamps } = req.body;
    const { timestamp1, timestamp2 } = timestamps;

    const format = 'DD:MM:YYYY HH:mm:ss';
    const time1 = moment(timestamp1, format);
    const time2 = moment(timestamp2, format);

    const differenceInSeconds = time2.diff(time1, 'seconds');
    console.log(differenceInSeconds);

    res.json({ differenceInSeconds });
  } catch (error) {
    console.error('Error calculating difference:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
