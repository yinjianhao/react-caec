import 'babel-polyfill'

//styles
import '../../../lib/styles/mobiscroll.custom-3.0.0-beta6.min.css';
import '../../common/css/caec-mobile.css';

import _ from 'lodash';
import React from 'react';
import { createApp } from 'restack-core';
// import router from 'restack-core/lib/plugins/router-plugin';
import router from './router-plugin';
import i18n from 'restack-core/lib/plugins/i18n-plugin';
import { browserHistory, hashHistory } from 'react-router';

import routes from './routes';

//choose the history that meet ur need
const app = createApp({
	plugins: [
		router({ routes: routes, history: hashHistory }),
		i18n({ defaultLocale: null })
	]
});

function mapContextModels2App(context) {
	return context.keys()
		.map((key) => {

			// app.model(context(key).default);
			return context(key).default;
		})
}

const modelContext = require.context('../', true, /.model.js$/)

// console.log(modelContext.keys());
// console.log(models);

var models = mapContextModels2App(modelContext)

_.each(models, (m, index) => {
	app.model(m);
})

app.render(document.getElementById('react-view'))

if (module.hot) {
	module.hot.accept(modelContext.id, () => {
		console.log('model reloaded.')
		// replace sagas
		const modifiedModelContext = require.context('../', true, /.model.js$/);
		const modifiedModels = mapContextModels2App(modifiedModelContext);
		app.replaceSagas(modifiedModels)
	})
}
