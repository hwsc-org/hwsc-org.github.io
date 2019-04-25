---
layout: wiki
directory: fundamentals
filename: db-migration.md
title: Fundamentals > Database Migration
---
## Database Migration
A Database migration refers to the management of incremental, reversible changes to relational database schemas.
This is performed on a database whenever it is necessary to update or revert that database's schema to some newer or older version.

### Migrate
We use [migrate](https://github.com/golang-migrate/migrate) for database migration.

### Tests
A fresh instance of the database is always used for testing.
If you need to update and build database testing, then perform the following:
1. If applicable, make a directory for migration source codes and name the directory specific to the type of database.
    - `mkdir test/psql` 
2. Make an `up` migration source code to update the database.
    - `touch <version>_<name>.up.sql` e.g.`touch 2_create_secret_trigger.up.sql`
        ```sql
        CREATE TABLE user_security.active_secret
        (
          secret_key            TEXT REFERENCES user_security.secrets(secret_key) ON DELETE CASCADE,
          created_timestamp     TIMESTAMPTZ,
          expiration_timestamp  TIMESTAMPTZ,
          one_row               bool PRIMARY KEY DEFAULT TRUE CONSTRAINT one_row_allowed CHECK(one_row)
        );
        
        CREATE FUNCTION insert_new_active_secret() RETURNS trigger AS
        $BODY$
        BEGIN
          EXECUTE 'DELETE FROM user_security.active_secret';
          INSERT INTO user_security.active_secret(secret_key, created_timestamp, expiration_timestamp, one_row)
          VALUES(NEW.secret_key, NEW.created_timestamp, NEW.expiration_timestamp, TRUE);
          RETURN NEW;
        END;
        $BODY$
        LANGUAGE plpgsql;
        
        CREATE TRIGGER update_active_secret
          AFTER INSERT ON user_security.secrets
          FOR EACH ROW
        EXECUTE PROCEDURE insert_new_active_secret();
        ```
3. Make an `down` migration source code to downgrade the database.
   - `touch <version>_<name>.down.sql` e.g.`touch 2_create_secret_trigger.down.sql`
        ```sql
        DROP TABLE IF EXISTS user_security.active_secret;
        DROP TRIGGER IF EXISTS update_active_secret ON user_security.secrets;
        DROP FUNCTION IF EXISTS insert_new_active_secret();
        ```
4. If you are using non-GoLang for testing, then perform the following command.
    - `migrate -source file://path/to/migrations -database postgres://localhost:5432/database up 2`
5. If you are using GoLang to test, then you can use `migrate` as a GoLang import library.
    ```golang
    import (
        "database/sql"
        _ "github.com/lib/pq"
        "github.com/golang-migrate/migrate/v4"
        "github.com/golang-migrate/migrate/v4/database/postgres"
        _ "github.com/golang-migrate/migrate/v4/source/file"
    )
    
    func main() {
        db, err := sql.Open("postgres", "postgres://localhost:5432/database?sslmode=enable")
        driver, err := postgres.WithInstance(db, &postgres.Config{})
        m, err := migrate.NewWithDatabaseInstance(
            "file:///test/psql",
            "postgres", driver)
        m.Steps(2)
    }
    ```
6. You can also use remote repository to fetch migration source scripts.
    ```golang
        import (
            "database/sql"
            _ "github.com/lib/pq"
            "github.com/golang-migrate/migrate/v4"
            "github.com/golang-migrate/migrate/v4/database/postgres"
            _ "github.com/golang-migrate/migrate/v4/source/file"
        )
        
        func main() {
            db, err := sql.Open("postgres", "postgres://localhost:5432/database?sslmode=enable")
            driver, err := postgres.WithInstance(db, &postgres.Config{})
            m, err := migrate.NewWithDatabaseInstance(
                "github://user:personal-access-token@owner/repo/path#ref",
                "postgres", driver)
            m.Steps(2)
        }
    ```
7. To release the new migration source script refer to the [releases](https://hwsc-org.github.io/wikis/fundamentals/db-migration.html#releases) section.

### Releases
1. Update the `hwsc-devops` [db-migrations](https://github.com/hwsc-org/hwsc-dev-ops/tree/master/db-migrations).
    - `test` folder is for integration tests.
    - `int` folder is for developmental deployment.
    - `ext` folder is for external releases.
2. These folders are used to determine the state of the database at the time of use.
3. Modification is not allowed in these folders. Use `up` and `down` or prepare a new migration source script.
