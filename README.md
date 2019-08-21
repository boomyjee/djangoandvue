# Review poster

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) ![npm](https://img.shields.io/badge/npm%40latest-v6.3.0-blue) ![Python](https://img.shields.io/badge/python-v3.7-blue)
![Awesome](https://camo.githubusercontent.com/fef0a78bf2b1b477ba227914e3eff273d9b9713d/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f617765736f6d652533462d796573212d627269676874677265656e2e737667)
![Vue](https://img.shields.io/badge/vue-v3.10.0-blue)

Built with Vue.js on frontend and Python framework Django on backend

Add your own review about something with REST Api

<a href="https://github.com/vchaptsev/cookiecutter-django-vue">
    <img src="https://img.shields.io/badge/built%20with-Cookiecutter%20Django%20Vue-blue.svg" />
</a>

## Before run

Please copy file **.env.template**, rename it to **.env** and change connection and security parameters inside this new file before the first run.

## Development

### Running docker compose

+ run `docker-compose up --build`

You also may need to use `sudo` for running docker depends on a way you installed docker and on your OS.

After successful run the app can be accessed on [http://127.0.0.1:8000/](http://127.0.0.1:8000/) (if you didn't change the url inside .env file).

### Login and test data

The first run  creates a test superuser with the email `superuser@example.com` and the password `superuser`. You can use these credentials to log in the app and the [admin panel](http://127.0.0.1:8000/admin).

### License

App is [MIT licensed](./LICENSE).
