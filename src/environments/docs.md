# src/environment

Environment configuration files are divided into development, qa, production, etc., and added to configurations in `angular.json` so that each environment can be used. This way, we can build for each environment like `ng build --configuration=qa`. Also, assuming we will use a blue green deploy, we can easily change the configuration by changing the `API_URL` from blue to green.
