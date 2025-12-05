# PERB-stack-starter

## Create postgres database
create docker-compose.yml file
following docker hub https://hub.docker.com/_/postgres
and start with docker compose https://docs.docker.com/compose/gettingstarted
```
docker compose up
```

## Create API

```
bun create elysia api
cd api
bun dev
```
Use ORM (Object–relational mapping)
Drizzle schema https://orm.drizzle.team/docs/get-started/postgresql-new
```
📦 src
 ├ 📂 drizzle
 ├ 📂 src
 │   ├ 📂 db
 │      └ 📜 schema.ts
 │      └ 📜 index.ts
 ├ 📜 .env
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

Install node-postgres package
```
bun add drizzle-orm pg dotenv
bun add -D drizzle-kit tsx @types/pg
```

edit file 
- api/src/db/index.ts
- api/src/db/schema.ts
- api/drizzle.config.ts

Create table
```
npx drizzle-kit generate
npx drizzle-kit migrate
```

See table with https://dbeaver.io/download/

Schema for MVC https://elysiajs.com/essential/best-practice.html

```
| src
  | modules
	| user
	  | index.ts (Elysia controller)
	  | service.ts (service)
	  | model.ts (model)
	| post
	  | index.ts (Elysia controller)
	  | service.ts (service)
	  | model.ts (model)
```

