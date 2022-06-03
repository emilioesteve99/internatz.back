import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class ApiDocumenter {
	public static document (app: any) {
		const config = new DocumentBuilder()
		.setTitle('INTERNATZ.BACK')
		.setDescription('Api para la gestión de traducciones en distintas empresas')
		.setVersion('1.0')
		.build();
	  const document = SwaggerModule.createDocument(app, config);
	  SwaggerModule.setup('api', app, document);
	}
}