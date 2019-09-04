# Base Images
FROM ubuntu:18.04

#MAINTAINER
MAINTAINER Jerome Zhang
# JAVA
RUN apt update
RUN apt install -y openjdk-8-jdk

# Spark
# ADD https://archive.apache.org/dist/spark/spark-2.4.3/spark-2.4.3-bin-hadoop2.6.tgz /usr/local
ADD spark-2.4.3-bin-hadoop2.6.tgz /usr/local 
RUN mv /usr/local/spark-2.4.3-bin-hadoop2.6/ /usr/local/spark

# Spark ENV
ENV SPARK_HOME /usr/local/spark/
ENV PATH $SPARK_HOME/bin:$PATH

#Python
RUN apt-get install -y software-properties-common
RUN ln -s /usr/bin/python3 /usr/bin/python
# ENV PATH=/usr/bin/python:$PATH
# ADD https://bootstrap.pypa.io/get-pip.py /
# RUN python /get-pip.py
# RUN rm /usr/local/get-pip.py
RUN apt-get install -y python-pip

# Analytics-zoo
RUN pip install analytics-zoo
