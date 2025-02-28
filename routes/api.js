'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      //error handle
      if(text === undefined || !locale){
        return res.json({error: 'Required field(s) missing'});
      }
      if(text === ""){
        return res.json({error: 'No text to translate'});
      }

      const result = translator.translate(text, locale);

      //error handle
      if(result.error){
        return res.json(result)
      }

      res.json(result);
    });
};
