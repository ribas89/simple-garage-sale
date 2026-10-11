FROM busybox:1.36.1-uclibc

WORKDIR /www

COPY src/ ./

RUN mkdir -p /www/assets

EXPOSE 80

ENTRYPOINT ["httpd"]
CMD ["-f", "-p", "0.0.0.0:80", "-h", "/www"]