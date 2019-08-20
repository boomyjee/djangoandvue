# FROM python:3.6

# # python envs
# ENV PYTHONFAULTHANDLER=1 \
#     PYTHONUNBUFFERED=1 \
#     PYTHONHASHSEED=random \
#     PIP_NO_CACHE_DIR=off \
#     PIP_DISABLE_PIP_VERSION_CHECK=on \
#     PIP_DEFAULT_TIMEOUT=100

# # python dependencies
# COPY ./requirements.txt /
# RUN pip install -r ./requirements.txt

# # upload scripts
# COPY ./scripts/entrypoint.sh ./scripts/start.sh ./scripts/gunicorn.sh /

# WORKDIR /app

FROM ubuntu:18.04

RUN apt-get update && apt-get install \
  -y --no-install-recommends python3 python3-virtualenv

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m virtualenv --python=/usr/bin/python3 $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# python dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# upload scripts
COPY ./scripts/entrypoint.sh ./scripts/start.sh ./scripts/gunicorn.sh /

WORKDIR /app
