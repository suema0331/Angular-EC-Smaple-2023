# src/environment

This `environment.ts` file is automatically generated from the `.env` file at startup for security purposes.(using `./src/scripts/setenv.ts`) Please have your administrator share the .env file with us :)
<br>
Environment configuration files are divided into development, qa, production, etc., and added to configurations in `angular.json` so that each environment can be used. This way, we can build for each environment like `ng build --configuration=qa`. Also, assuming we will use a blue green deploy, we can easily change the configuration by changing the `API_URL` from blue to green.
