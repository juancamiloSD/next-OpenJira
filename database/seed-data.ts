interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendiente: lorem ipsum dolor duis elit sunt qui dolor laborum veniam ea laboris quis consequat.",
      status: "pending",
      createAt: Date.now(),
    },
    {
      description:
        "En Progreso: lorem ipsum dolor duis elit sunt qui dolor laborum veniam ea laboris quis consequat2.",
      status: "in-progress",
      createAt: Date.now() - 1000000,
    },
    {
      description:
        "Finalizado: lorem ipsum dolor duis elit sunt qui dolor laborum veniam ea laboris quis consequat3.",
      status: "finished",
      createAt: Date.now() - 100000,
    },
  ],
};
