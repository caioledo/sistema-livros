import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import * as Sentry from '@sentry/node';
//import * as Tracing from '@sentry/tracing';
import cors from 'cors';

import './database';

import rotas from './rotas';
import uploadConfig from './config/upload';
//191.252.5.79

const app = express();

Sentry.init({ 
    dsn: 'https://f6a83ade9fa14a98b374a7ab42b46660@o443193.ingest.sentry.io/5416508',
	tracesSampleRate: 1.0
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(Sentry.Handlers.requestHandler());
app.use(rotas);
app.use(Sentry.Handlers.errorHandler());

app.listen(3333, () => {
    console.log('Server started on ', process.env.APP_API_URL, 'secret:', process.env.APP_SECRET);
});
