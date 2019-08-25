FROM ubuntu:latest
LABEL version="0.0.0" description="FOOF backend server" author="Hanyuu Furude <Furude_Hanyuu@outlook.com>"
WORKDIR /foof
EXPOSE 4000
ADD ./dist/index.js /foof
ADD ./node-v10.16.3-linux-x64.tar /foof
# RUN tar -xvf ./node-v10.16.3-linux-x64.tar \
# 	&& rm ./*.tar
CMD ["./node-v0.10.28-linux-x64/bin/node","./index.js"]