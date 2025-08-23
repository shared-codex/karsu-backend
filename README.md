# Karsu Backend

This project uses TypeORM with PostgreSQL.

## Migrations

Schema changes are managed through TypeORM migrations. Synchronization is disabled, so migrations must be generated and run for any schema updates.

### Generate a migration

```
npm run migration:generate --name=MigrationName
```

### Run migrations

```
npm run migration:run
```

Ensure the database configuration in your environment variables is correct before running these commands.

