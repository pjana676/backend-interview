#!/bin/bash

npx sequelize-cli db:migrate
npm run seed
npm run start