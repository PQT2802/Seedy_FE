import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface GenericTableProps<T> {
  data: T[];
}

export function GenericTable<T extends Record<string, any>>({
  data,
}: GenericTableProps<T>) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">No data available.</p>;
  }

  // Extract column names dynamically, excluding "id"
  const columns = Object.keys(data[0]).filter((column) => column !== "id");

  return (
    <div className="border rounded-lg shadow-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="capitalize">
                {column.replace(/([A-Z])/g, " $1").trim()}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column}>
                  {/* Check if the column contains an image URL */}
                  {typeof row[column] === "string" &&
                  row[column].startsWith("http") ? (
                    <Image
                      src={row[column]}
                      alt={row.name || "Image"}
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ) : (
                    row[column]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
