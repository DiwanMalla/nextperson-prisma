//'use client'

import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { Person } from "../lib/person";

interface PersonTableProps {
  people: Person[];
  handleOpen: (person: Person | null) => void;
  handleDelete: (id: number) => void;
}

const PersonTable: React.FC<PersonTableProps> = ({
  people,
  handleOpen,
  handleDelete,
}) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Date of birth</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {people.map((person) => (
          <TableRow key={person.id}>
            <TableCell>{person.firstname}</TableCell>
            <TableCell>{person.lastname}</TableCell>
            <TableCell>{person.phone}</TableCell>
            <TableCell>
              {person.dob
                ? new Date(person.dob).toLocaleDateString()
                : "Not Provided"}
            </TableCell>
            <TableCell>
              <Button onClick={() => handleOpen(person)}>Edit</Button>
              <Button onClick={() => handleDelete(person.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default PersonTable;
