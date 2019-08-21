# DjangoAndVue

Awesome test website

<a href="https://github.com/vchaptsev/cookiecutter-django-vue">
    <img src="https://img.shields.io/badge/built%20with-Cookiecutter%20Django%20Vue-blue.svg" />
</a>

## Before run

Please copy file **.env.template**, rename it to **.env** and change connection and security parameters inside this new file before first run.

## Development

### Running docker compose

+ run `docker-compose up --build`

You also may need to use `sudo` for running docker - depends on a way you installed docker and on the OS you use.

After successfull run the app can be access in [http://127.0.0.1:8000/](http://127.0.0.1:8000/) (if you didn't change the url inside .env file).

### Login and test data

On first running, there will be creating a test superuser with email `superuser@example.com` and password `superuser`. You can use these credentials for login inside the app and inside the [admin panel](http://127.0.0.1:8000/admin).
