FROM ubuntu:latest
LABEL version="0.0.0" description="FOOF backend server" author="Hanyuu Furude <Furude_Hanyuu@outlook.com>"
WORKDIR /foof
EXPOSE 4000
ADD ./dist/index.js /foof
ADD ./node-v10.16.3-linux-x64.tar /foof
RUN ln -s /foof/node-v10.16.3-linux-x64/bin/node /usr/local/bin/node
CMD ["node","index.js"]