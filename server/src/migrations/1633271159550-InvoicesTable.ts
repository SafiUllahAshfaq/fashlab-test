import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InvoicesTable1633271159550 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'invoices', columns: [
                { name: 'internal_invoice_id', type: 'varchar' },
                { name: 'amount', type: 'varchar' },
                { name: 'due_date', type: 'varchar' },
                { name: 'created_at', type: 'varchar' },
                { name: 'selling_price', type: 'varchar' },
                { name: 'issue', type: 'varchar' },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('invoices');
    }

}
