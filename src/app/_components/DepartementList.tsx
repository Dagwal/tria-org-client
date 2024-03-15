import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Group, Avatar, Text, rem } from '@mantine/core';
import { createStyles } from '@mantine/styles';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
}));

const data = [
  {
    id: '1',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
    departementName: 'CEO',
    reportTo: '---',
    description: 'Chief Executive Officer',
  },
  {
    id: '2',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    departementName: 'CFO',
    reportTo: 'CEO',
    description: 'Chief Financial Officer',
  },
  {
    id: '3',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    departementName: 'CMO',
    reportTo: 'CEO',
    description: ' Chief Marketing Officer',
  },
  {
    id: '4',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    departementName: 'CTO',
    reportTo: 'CEO',
    description: 'Chief Technology Officer',
  },
  {
    id: '5',
    avatar:
      'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    departementName: 'X',
    reportTo: 'CTO',
    description: 'X Technology Officer',
  },
];

export function   TableSelection() {
  const {classes, cx} = useStyles();
  const [selection, setSelection] = useState(['1']);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.departementName}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.description}</Table.Td>
        <Table.Td>{item.reportTo}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={selection.length > 0 && selection.length !== data.length}
              />
            </Table.Th>
            <Table.Th>Departement</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Reports To</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}