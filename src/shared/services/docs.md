# src/shared

Modules that may be shared by the backend frontend, such as authentication, guards, etc. Shared by the `BackendModule` and `AppModule`.

- `LogService`: Service can be used if we want to output logs only in the development and qa environments for debugging purposes. If we use this, no logs will be output in the production environment.
- `StorageService`: Service for manipulating the local storage.
