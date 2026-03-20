import { app } from './app';

// Standalone server for development/testing
const server = app.listen(3050);

console.log(`🦊 Elysia API is running at http://localhost:${server?.server?.port}`);
console.log(`📚 Swagger documentation: http://localhost:${server?.server?.port}/api/swagger`);
