import { Component } from '@angular/core';
import { SwaggerUIBundle } from 'swagger-ui-dist';

@Component({
  selector: 'app-swagger',
  templateUrl: './swagger.component.html',
  styleUrls: ['./swagger.component.scss'],
})
export class SwaggerComponent {
  ngOnInit(): void {
    SwaggerUIBundle({
      dom_id: '#swagger-ui',
      layout: 'BaseLayout',
      presets: [
        SwaggerUIBundle['presets'].apis,
        SwaggerUIBundle['SwaggerUIStandalonePreset'],
      ],
      url: '/assets/swagger/openapi.yaml',
      // operationsSorter: () => { },
    });
  }
}
