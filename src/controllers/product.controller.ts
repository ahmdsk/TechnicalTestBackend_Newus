import { RequestHandler } from "express";
import prisma from "../prisma";
import { z } from "zod";

export const index: RequestHandler = async (req, res) => {
  const data = await prisma.product.findMany({
    include: {
      categories: true,
    },
  });

  res.json({ data });
};

export const store: RequestHandler = async (req, res) => {
  try {
    const schema = z.object({
      name: z.string(),
      category_id: z.string().transform((v) => Number(v)),
      desc: z.string().optional(),
    });

    const body = schema.parse(req.body);

    const category = await prisma.categories.findFirst({
      where: {
        id: body.category_id,
      },
    });

    if (!category) {
      res.status(400).json({ message: "Category not found" });
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "File is required" });
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        desc: body.desc,
        image: file?.originalname,
        category_id: body.category_id,
      },
    });

    res.json({ data: product });
  } catch (error: any) {
    res.status(400).json({ message: JSON.parse(error.message) });
  }
};

export const show: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });

    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: "Product not found" });
  }
};

export const update: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const schema = z.object({
      name: z.string(),
      category_id: z.string().transform((v) => Number(v)),
      desc: z.string().optional(),
    });

    const body = schema.parse(req.body);

    const category = await prisma.categories.findFirst({
      where: {
        id: body.category_id,
      },
    });

    if (!category) {
      res.status(400).json({ message: "Category not found" });
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ message: "File is required" });
    }

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        desc: body.desc,
        image: file?.originalname,
        category_id: body.category_id,
      },
    });

    res.json({ data: product });
  } catch (error: any) {
    res.status(400).json({ message: JSON.parse(error.message) });
  }
};

export const destroy: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await prisma.product.delete({
      where: {
        id,
      },
    });

    res.json({ data });
  } catch (error) {
    res.status(400).json({ message: "Product not found" });
  }
};
