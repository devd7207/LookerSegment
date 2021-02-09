FROM node:12.13.0
RUN mkdir -p /code
WORKDIR /code
ADD . /code

CMD ["npm","start"]

EXPOSE 80
