# Base Images
FROM ubuntu:18.04

#MAINTAINER
MAINTAINER Jerome Zhang
#Spark
ADD spark-2.4.3-bin-hadoop2.6.tgz /usr/local
# JAVA
RUN mv /usr/local/spark-2.4.3-bin-hadoop2.6/ /usr/local/spark && apt-get update && apt-get install -y \
        openjdk-8-jdk\
        software-properties-common
# Spark ENV
ENV SPARK_HOME /usr/local/spark/
#ENV PATH $SPARK_HOME/bin:$PATH

#Python & Analytics-zoo
#RUN ln -s /usr/bin/python3 /usr/bin/python && pip install analytics-zoo && rm -rf ~/.cache/pip ~/.cache/apt
