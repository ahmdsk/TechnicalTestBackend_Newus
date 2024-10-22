import { RequestHandler } from "express";
import prisma from "../prisma";
import { z } from "zod";

export const index: RequestHandler = async (req, res) => {
  const data = await prisma.categories.findMany();

  res.json({ data });
};

export const store: RequestHandler = async (req, res) => {
  try {
    const schema = z.object({
      name: z.string(),
    });

    const { name } = schema.parse(req.body);

    const data = await prisma.categories.create({
      data: {
        name,
      },
    });

    res.json(data);
  } catch (error: any) {
    res.status(400).json({ message: JSON.parse(error.message) });
  }
};

export const show: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.categories.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: "Data not found" });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const schema = z.object({
      name: z.string(),
    });

    const { name } = schema.parse(req.body);

    const data = await prisma.categories.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    res.json(data);
  } catch (error: any) {
    res.status(400).json({ message: JSON.parse(error.message) });
  }
};

export const destroy: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await prisma.categories.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json(data);
  } catch (error) {
    res.status(400).json({ message: "Data not found" });
  }
};
