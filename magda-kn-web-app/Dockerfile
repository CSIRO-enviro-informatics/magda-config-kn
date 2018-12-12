
FROM node

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env=production
ENV APP_ENV $app_env

RUN mkdir -p /kn-web
COPY . /kn-web
WORKDIR /kn-web

RUN npm install

CMD if [ ${APP_ENV} = production ]; \
	then \
	npm install -g serve && \
	npm run build && \
	serve --port 3000 -s build \
	else \
	nohup npm run start; \
	fi

EXPOSE 3000
