const router = require('express').Router();
const axios = require('axios');
const TOKEN = require('../../.config.js');
const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-sjo/';

axios.defaults.headers.common['Authorization'] = TOKEN;

router.route('/')