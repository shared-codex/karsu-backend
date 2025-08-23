import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddCascadeDeleteToRelations1756000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const assignmentTable = await queryRunner.getTable("worker_device_assignments");
    const assignmentWorkerFk = assignmentTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (assignmentWorkerFk) await queryRunner.dropForeignKey("worker_device_assignments", assignmentWorkerFk);
    await queryRunner.createForeignKey(
      "worker_device_assignments",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
        onDelete: "CASCADE",
      })
    );
    const assignmentDeviceFk = assignmentTable?.foreignKeys.find(fk => fk.columnNames.includes("device_id"));
    if (assignmentDeviceFk) await queryRunner.dropForeignKey("worker_device_assignments", assignmentDeviceFk);
    await queryRunner.createForeignKey(
      "worker_device_assignments",
      new TableForeignKey({
        columnNames: ["device_id"],
        referencedTableName: "devices",
        referencedColumnNames: ["device_id"],
        onDelete: "CASCADE",
      })
    );

    const shiftTable = await queryRunner.getTable("shift_attendance");
    const shiftWorkerFk = shiftTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (shiftWorkerFk) await queryRunner.dropForeignKey("shift_attendance", shiftWorkerFk);
    await queryRunner.createForeignKey(
      "shift_attendance",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
        onDelete: "CASCADE",
      })
    );

    const conditionTable = await queryRunner.getTable("worker_health_conditions");
    const conditionWorkerFk = conditionTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (conditionWorkerFk) await queryRunner.dropForeignKey("worker_health_conditions", conditionWorkerFk);
    await queryRunner.createForeignKey(
      "worker_health_conditions",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
        onDelete: "CASCADE",
      })
    );

    const incidentTable = await queryRunner.getTable("worker_health_incidents");
    const incidentWorkerFk = incidentTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (incidentWorkerFk) await queryRunner.dropForeignKey("worker_health_incidents", incidentWorkerFk);
    await queryRunner.createForeignKey(
      "worker_health_incidents",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
        onDelete: "CASCADE",
      })
    );

    const alertTable = await queryRunner.getTable("alerts");
    const alertWorkerFk = alertTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (alertWorkerFk) await queryRunner.dropForeignKey("alerts", alertWorkerFk);
    await queryRunner.createForeignKey(
      "alerts",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
        onDelete: "CASCADE",
      })
    );

    const sensorTable = await queryRunner.getTable("sensor_readings");
    const sensorDeviceFk = sensorTable?.foreignKeys.find(fk => fk.columnNames.includes("device_id"));
    if (sensorDeviceFk) await queryRunner.dropForeignKey("sensor_readings", sensorDeviceFk);
    await queryRunner.createForeignKey(
      "sensor_readings",
      new TableForeignKey({
        columnNames: ["device_id"],
        referencedTableName: "devices",
        referencedColumnNames: ["device_id"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const assignmentTable = await queryRunner.getTable("worker_device_assignments");
    const assignmentWorkerFk = assignmentTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (assignmentWorkerFk) await queryRunner.dropForeignKey("worker_device_assignments", assignmentWorkerFk);
    await queryRunner.createForeignKey(
      "worker_device_assignments",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
      })
    );
    const assignmentDeviceFk = assignmentTable?.foreignKeys.find(fk => fk.columnNames.includes("device_id"));
    if (assignmentDeviceFk) await queryRunner.dropForeignKey("worker_device_assignments", assignmentDeviceFk);
    await queryRunner.createForeignKey(
      "worker_device_assignments",
      new TableForeignKey({
        columnNames: ["device_id"],
        referencedTableName: "devices",
        referencedColumnNames: ["device_id"],
      })
    );

    const shiftTable = await queryRunner.getTable("shift_attendance");
    const shiftWorkerFk = shiftTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (shiftWorkerFk) await queryRunner.dropForeignKey("shift_attendance", shiftWorkerFk);
    await queryRunner.createForeignKey(
      "shift_attendance",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
      })
    );

    const conditionTable = await queryRunner.getTable("worker_health_conditions");
    const conditionWorkerFk = conditionTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (conditionWorkerFk) await queryRunner.dropForeignKey("worker_health_conditions", conditionWorkerFk);
    await queryRunner.createForeignKey(
      "worker_health_conditions",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
      })
    );

    const incidentTable = await queryRunner.getTable("worker_health_incidents");
    const incidentWorkerFk = incidentTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (incidentWorkerFk) await queryRunner.dropForeignKey("worker_health_incidents", incidentWorkerFk);
    await queryRunner.createForeignKey(
      "worker_health_incidents",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
      })
    );

    const alertTable = await queryRunner.getTable("alerts");
    const alertWorkerFk = alertTable?.foreignKeys.find(fk => fk.columnNames.includes("worker_id"));
    if (alertWorkerFk) await queryRunner.dropForeignKey("alerts", alertWorkerFk);
    await queryRunner.createForeignKey(
      "alerts",
      new TableForeignKey({
        columnNames: ["worker_id"],
        referencedTableName: "workers",
        referencedColumnNames: ["worker_id"],
      })
    );

    const sensorTable = await queryRunner.getTable("sensor_readings");
    const sensorDeviceFk = sensorTable?.foreignKeys.find(fk => fk.columnNames.includes("device_id"));
    if (sensorDeviceFk) await queryRunner.dropForeignKey("sensor_readings", sensorDeviceFk);
    await queryRunner.createForeignKey(
      "sensor_readings",
      new TableForeignKey({
        columnNames: ["device_id"],
        referencedTableName: "devices",
        referencedColumnNames: ["device_id"],
      })
    );
  }
}
