import { Component } from '@angular/core';
// We can import this library dynamically.
// import { SwaggerUIBundle } from 'swagger-ui-dist';
@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
})
export class SwaggerComponent {
  swaggerUIBundle: any;

  ngOnInit(): void {
    // with dynamic import
    this.loadSwaggerUIBundle().then(() => {
      this.swaggerUIBundle({
        dom_id: '#swagger-ui',
        layout: 'BaseLayout',
        presets: [
          this.swaggerUIBundle['presets'].apis,
          this.swaggerUIBundle['SwaggerUIStandalonePreset'],
        ],
        url: '/assets/swagger/openapi.yaml',
        // operationsSorter: () => { },
      });
    });

    // without dynamic import
    // SwaggerUIBundle({
    //   dom_id: '#swagger-ui',
    //   layout: 'BaseLayout',
    //   presets: [
    //     SwaggerUIBundle['presets'].apis,
    //     SwaggerUIBundle['SwaggerUIStandalonePreset'],
    //   ],
    //   url: '/assets/swagger/openapi.yaml',
    //   // operationsSorter: () => { },
    // });
  }
  async loadSwaggerUIBundle() {
    if (!this.swaggerUIBundle) {
      const { SwaggerUIBundle } = await import('swagger-ui-dist');
      this.swaggerUIBundle = SwaggerUIBundle;
    }
  }
}
