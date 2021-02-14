const duplicate = `SELECT * FROM test WHERE field22 = ?`;
const add = `INSERT INTO test (
		            field20,
                    field22,
                    field1,
                    field2,
                    field4,
                    field5,
                    field6,
                    field7,
                    field8,
                    field10,
                    field31,
                    field28,
                    field19,
                    field12,
                    field9,
                    field15,
                    field32 
		        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
const last_record = `SELECT * FROM test WHERE rowid = ?`;
