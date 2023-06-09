import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../database/db";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data = { message: string } | IEntry;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es valido" + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      res.status(400).json({ message: "Método no existe" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const entryToGet = await Entry.findById(id);

  await db.disconnect();

  if (!entryToGet) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese id" + id });
  }
  return res.status(200).json(entryToGet);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese id" + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    console.log({ error });
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("entre en el api/entries/id/index.ts");
  const { id } = req.query;

  await db.connect();
  const entryDBTodelete = await Entry.findByIdAndDelete(id);
  await db.disconnect();

  console.log("estoy antes del if en  api/entries/id/index.ts");

  if (!entryDBTodelete) {
    return res.status(400).json({ message: "No hay entrada con ese id " + id });
  }

  return res.status(200).json(entryDBTodelete);
};
