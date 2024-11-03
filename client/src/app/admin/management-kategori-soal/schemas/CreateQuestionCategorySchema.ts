import { z } from "zod";

export const createQuestionCategorySchema = z.object({
  kategori_soal: z.array(
    z.object({
      nama_kategori: z.string().nonempty("Kategori soal harus diisi"),
      bobot_benar: z
        .number({ invalid_type_error: "Nilai harus berupa angka" })
        .min(1, "Bobot nilai benar harus lebih dari 0"),
      bobot_salah: z
        .number({ invalid_type_error: "Nilai harus berupa angka" })
        .min(1, "Bobot nilai salah harus lebih dari 0"),
      tidak_menjawab: z
        .number({ invalid_type_error: "Nilai harus berupa angka" })
        .min(1, "Bobot nilai tidak menjawab harus lebih dari 0"),
    })
  ),
});
