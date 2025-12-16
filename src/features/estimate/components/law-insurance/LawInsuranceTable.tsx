import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InsurancePlansData, InsurancePlansHeader } from '@/mocks/plans-data';

export const LawInsuranceTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Cobertura</TableHead>
          {InsurancePlansHeader.map((header) => (
            <TableHead>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
    </Table>
  );
};
