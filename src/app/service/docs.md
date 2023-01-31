# src/app/service

Services for the **Application layer**.
Not used at this time. But in the future, the front-end injects and calls the `ApplicationService`, does not call the backend service form `./backend/services` directly. In `ApplicationService`, the backend services that the frontend wants to invoke are centrally managed in the application layer (ApplicationService) and are provided by `AppModule`.

- `/domains`: Describe services for the **Domain layer**. This will include Payment or OrderService and so on in the future.

  - `AuthService`: Service for authentication using Firebase (@angular/fire).
  - `AuthGuard`: Guard for logged-in users.
  - `VIPGuard`: Guard to allow only a limited number of VIP users.

- `/utilities`: Describe methods that are used repeatedly in the application as services.

  - `ImageUrlService`: Centralize and change where image files are retrieved from. For example, if customers are added in the future, they will be retrieved from objects stored in S3 using CroudFront rather than backend.
  - `LocationService`: On the premise that screen IDs are centrally managed (e.g., in requirement definition documents), by centrally managing navigation and page paths based on screen IDs in this `LocationService`, even when page path changing happens, the app can be more robust and there is no need to re-implement all pages when the path is changed.
  - `NotificationService`: Service to send notifications using toasts.
  - `PriceService`: Service for calculating prices, including discount rates and amounts including tax.
  - `SEOService`: As an SEO measure for this SPA app, update the Meta tag using `SEOservice` once the page transition is completed.
  - `ValidationService`:
    - E-mail address: Include @, 1 to 50 characters. (Considering the limitation by the type definition in database)
    - Password: 11 characters or more and less than 20 characters, Include uppercase and lowercase letters, numbers, and the allowed symbols, Not contain the exact same email address or part of an email address.
