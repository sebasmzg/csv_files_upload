// Define an interface for a single row of data
export interface DataRow {
    [key: string]: string; // Each property key is a string, and the value is also a string
}

// Define a type for a table of data, which is an array of DataRow objects
export type DataTable = DataRow[];

// Define a type for a column name, which is simply a string
export type ColumnName = string[];