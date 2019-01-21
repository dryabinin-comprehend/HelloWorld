FROM openjdk:8

ENV SCALA_VERSION 2.11.12
ENV SBT_VERSION 1.2.8

ADD ./helloWorld /app/
WORKDIR /app

# Install NodeJS
RUN apt-get update
RUN apt-get -y install curl
RUN curl --silent --location https://deb.nodesource.com/setup_11.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

#Generate bundle.js form react project
RUN \
    cd /app/src/main/react && \
    npm install && \
    npm run build

# Install Scala
RUN \
  cd /root && \
  curl -o scala-$SCALA_VERSION.tgz http://downloads.typesafe.com/scala/$SCALA_VERSION/scala-$SCALA_VERSION.tgz && \
  tar -xf scala-$SCALA_VERSION.tgz && \
  rm scala-$SCALA_VERSION.tgz && \
  echo >> /root/.bashrc && \
  echo 'export PATH=~/scala-$SCALA_VERSION/bin:$PATH' >> /root/.bashrc

# Install SBT
RUN \
  curl -L -o sbt-$SBT_VERSION.deb https://dl.bintray.com/sbt/debian/sbt-$SBT_VERSION.deb && \
  dpkg -i sbt-$SBT_VERSION.deb && \
  rm sbt-$SBT_VERSION.deb

EXPOSE 9000

RUN \
  cd /app && \
  sbt clean compile

CMD ["sbt", "run"]
