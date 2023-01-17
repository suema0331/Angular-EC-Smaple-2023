# src/app

- `AppRoutingModule`: Routing is written and loaded in app.module.ts. Meta tag content is described in each routing.
- `AppComponent`: For SEO in this SPA application, I implement the Subscription to start monitoring NavigationEnd to each page when the app is first launched and update the Meta tag when the page transition is complete using `SEOservice`.
