FROM fusuf/whatsasena:latest

RUN git clone https://github.com/rexlogics/rextest /root/Rexa
WORKDIR /root/Rexa/
ENV TZ=Asia/Kolkata
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "bot.js"]
