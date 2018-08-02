/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * Cincinnati Reds random fact alexa skill. Based off a pre-designed alexa-skill-set
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.ec7e0ec8-11db-48a7-aa7b-d8fddbc8d95e";  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'Great American Ballpark was constructed with 10,100 tons of steel',
                 'The team name, Redlegs, came in spite of fear of affiliation ' 
                  + 'between Communism, and the color red during the 1950\'s',
                'There have been 4 Cincinnati Reds team captians. '
                  + 'First Baseman, Jake Daubert.'
                  + 'Hit King, Pete Rose.'
                  + 'Shortstop, Dave Concepción.'
                  + 'Shortstop, Barry Larkin.',
                'Pete Rose holds the most all-star appearances, with 17',
                'Pete Rose has played 500+ games, at 5 different positions. '
                  + 'First base, left field, third base, second base, and right field',
                'In 1914, Jake Daubert had 4 sacrifice bunts in one game',
                'The Cincinnati Reds have hosted 5 all-star games, the most by any team.',
            ],
            SKILL_NAME: 'Cincinnati Reds Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
