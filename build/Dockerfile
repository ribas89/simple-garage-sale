FROM busybox:1.36.1-uclibc

WORKDIR /www

COPY src/ ./

RUN mkdir -p /www/assets

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["httpd", "-f", "-p", "80", "-h", "/www"]