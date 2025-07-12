import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap(){
    const app=await NestFactory.create(AppModule);

    //enable cors
    app.enableCors({
        origin:'*', 
        methods:['GET','POST','PATCH','DELETE'],
        allowedHeaders:['Content-Type','Authorization'],

    }),

    app.useWebSocketAdapter(new IoAdapter(app));

    app.useGlobalPipes(new ValidationPipe());


    const PORT=3000;
    await app.listen(PORT);
    Logger.log(`Server running on http://localhost:${PORT}`);
}
bootstrap();