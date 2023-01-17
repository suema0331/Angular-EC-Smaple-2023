# src/shared

Modules that may be shared by the backend frontend, such as authentication, guards, etc. Shared by the `BackendModule` and `AppModule`.

- `AuthService`: Service for authentication using Firebase (@angular/fire).
- `LogService`: Service can be used if we want to output logs only in the development and qa environments for debugging purposes. If we use this, no logs will be output in the production environment.
- `AuthGuard`: Guard for logged-in users.
- `VIPGuard`: Guard to allow only a limited number of VIP users.
- `StorageService`: Service for manipulating the local storage.
