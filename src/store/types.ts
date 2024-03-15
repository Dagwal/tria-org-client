export interface Departement {
  id: string;
  name: string;
  description: string;
  parentId?: string | null;
  children: Departement[];
}