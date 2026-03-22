FROM mcr.microsoft.com/dotnet/runtime-deps:8.0-noble

COPY --chmod=755 radarr /opt/radarr

RUN groupadd -g 1000 radarr && \
    useradd -u 1000 -g radarr -d /config -s /bin/bash radarr && \
    mkdir -p /config && chown radarr:radarr /config

ENV RADARR_BRANCH="develop" \
    XDG_CONFIG_HOME="/config/xdg"

VOLUME /config
EXPOSE 7878

USER radarr
ENTRYPOINT ["/opt/radarr/Radarr", "-nobrowser", "-data=/config"]
