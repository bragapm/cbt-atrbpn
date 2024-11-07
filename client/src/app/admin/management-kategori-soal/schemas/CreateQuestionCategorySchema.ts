import { z } from "zod";

export const createQuestionCategorySchema = z.object({
  kategori_soal: z.array(
    z.object({
      nama_kategori: z.string().nonempty("Kategori soal harus diisi"),
      bobot_benar: z.number({ invalid_type_error: "Nilai harus berupa angka" }),
      bobot_salah: z.number({ invalid_type_error: "Nilai harus berupa angka" }),
      tidak_menjawab: z.number({
        invalid_type_error: "Nilai harus berupa angka",
      }),
    })
  ),
});
